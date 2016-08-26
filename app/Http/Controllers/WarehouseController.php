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
class WarehouseController extends Controller
{


    public function GetAllReturnedCases(){
        $data= DB::table('refundcase')

            ->where('RefundCaseStatus', '<>','Link Generated')
            ->get();
        return response()->json($data);
    }
    public function UpdateCaseStatus(Request $request){
        DB::table('refundcase')
            ->where('RefundCase_Id', '=',$request->input('RefundCase_Id'))
            ->update(['RefundCaseStatus' => $request->input('RefundCaseStatus')]);
        return 'true';
    }
    public function GetReturnedCase($id){
        $data= DB::table('refundcase')
            ->where('RefundCase_Id', '=',$id)
            ->get();
        return response()->json($data);
    }
    public function UpdateCase(Request $request,$id){

        DB::table('refundcase')
            ->where('RefundCase_Id', '=',$id)
            ->update(['RefundCaseDetail' => $request->getContent()]);
        return 'true';
    }
    public function AddMessage(Request $request){

        DB::table('casemessages')->insert([
            'RefundCase_Id' => $request->input('RefundCase_Id'),
            'From_name' => $request->input('From_name'),
            'Seller_Id' => $request->input('Seller_Id'),
            'Message'=>$request->input('Message')
        ]);

        return 'true';
    }
    public function GetAllSellers(){
        $data=  User::whereHas('roles', function($q)
        {
            $q->where('name', 'Seller');
        })->get();
        return response()->json($data);
    }

    public function SendNotification(Request $request){
        DB::table('notifications')->insert([
            'from_user_id' => $request->input('from_user_id'),
            'to_user_id' => $request->input('to_user_id'),
            'notificationMsg' => $request->input('notificationMsg')
        ]);

    }

}