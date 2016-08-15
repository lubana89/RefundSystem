<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use Session;
use Exception;
use DB;
class QRController extends Controller
{
    public function GetQR(){

        $CasedId=Session::get('CaseId');
        Session::forget('CaseId');
        if($CasedId!=null){
            DB::table('caselinks')
                ->where('RefundCase_Id', '=',$CasedId)
                ->update(['IsActive' => 1]);
        return view('QR',['Data'=>$CasedId]);
        } else {
            return view('errors.InvalidLink');
        }
    }
public function UpdateCaseData(Request $request){
    $CasedId=Session::get('CaseId');
    DB::table('refundcase')
        ->where('RefundCase_Id', '=',$CasedId)
        ->update(['RefundCaseDetail' => $request->getContent(),'RefundCaseStatus'=>'Label Generated']);
    return 'true';
}


}
