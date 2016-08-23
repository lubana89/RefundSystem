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
            ->select('RefundCaseDetail','RefundCase_Id','RefundCaseStatusKey','RefundCaseStatus')
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
            ->select('RefundCaseDetail','RefundCase_Id','RefundCaseStatusKey','RefundCaseStatus')
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

}