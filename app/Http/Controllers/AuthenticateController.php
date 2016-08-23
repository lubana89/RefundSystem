<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use App\Permission;
use App\Role;
use DB;
use Hash;
use DateTime;
use Illuminate\Support\Facades\Auth;
class AuthenticateController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    /**
     * Return the user
     *
     * @return Response
     */
    public function Index()
    {
        return response()->json(['users'=>User::with('roles')->get()]);
    }

    /**
     * Return a JWT
     *
     * @return Response
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }
    /**
     * Return the authenticated user
     *
     * @return Response
     */
    public function GetAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }
    public function GetRole(){
      return  response()->json(User::find(Auth::user()->id)->roles[0]->name);
    }
    public function CreateRole(Request $request){
        $role = new Role();
        $role->name = $request->input('name');
        $role->save();
        return response()->json("created");
    }

    public function CreatePermission(Request $request){
        $viewUsers = new Permission();
        $viewUsers->name = $request->input('name');
        $viewUsers->save();
        return response()->json("created");
    }

    public function AssignRole(Request $request){
        DB::table('role_user')
            ->where('user_id', '=',$request->input('id'))
            ->delete();
        DB::table('role_user')
            ->insert([
                'user_id' => $request->input('id'),
                'role_id' => $request->input('role')
            ]);

        return response()->json("assigned");
    }

    public function AttachPermission(Request $request){
        $role = Role::where('name', '=', $request->input('role'))->first();
        $permission = Permission::where('name', '=', $request->input('name'))->first();
        $role->attachPermission($permission);

        return response()->json("created");
    }
    public function CreateUser(Request $request){

        DB::table('users')->insert([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'created_at'=>new DateTime(),
            'updated_at'=>new DateTime()
        ]);
        return response()->json("created");
    }
    public function UpdateUser(Request $request){
        if($request->input('password') !=''){
            DB::table('users')
                ->where('id', '=',$request->input('id'))
                ->update(['name' => $request->input('name'),'email' => $request->input('email'),'password' => Hash::make($request->input('password')),'updated_at'=>new DateTime()]);
        }
        else{
            DB::table('users')
                ->where('id', '=',$request->input('id'))
                ->update(['name' => $request->input('name'),'email' => $request->input('email'),'updated_at'=>new DateTime()]);
            DB::table('password_resets')->insert(['email' => $request->input('email'),'token' => Hash::make($request->input('password')),'created_at'=>new DateTime()]);

        }
        return response()->json("updated");
    }
    public function DeleteUser($id){
            DB::table('users')
                ->where('id', '=',$id)
                ->delete();
        return response()->json("deleted");
    }
    public function GetRoles(){
        return DB::table('roles')
            ->select('id','name')
            ->get();
    }

}