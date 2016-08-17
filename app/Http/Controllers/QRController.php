<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use Session;
use Exception;
use DB;
class QRController extends Controller
{

    private  function generateRandomString($length = 16) {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    public function GetQR(){
        $trackingId=Session::get('TrackingID');
        Session::forget('TrackingID');
        $CasedId=Session::get('CaseId');
        Session::forget('CaseId');
        if($CasedId!=null){
            DB::table('caselinks')->where('RefundCase_Id', '=',$CasedId)->update(['IsActive' => 0]);//change to 0 for 1 time link
        return view('QR',['Data'=>$CasedId,'TrackingID'=>config('app.url').'/Status/'.$trackingId]);
        } else {
            return view('errors.InvalidLink');
        }
    }
    public function UpdateCaseData(Request $request){
        $CaseId=Session::get('CaseId');
        Session::put('TrackingID', $this->generateRandomString().$CaseId);

        DB::table('refundcase')
            ->where('RefundCase_Id', '=',$CaseId)
            ->update(['RefundCaseDetail' => $request->getContent(),'RefundCaseStatus'=>'Label Generated','RefundCaseStatusKey'=>Session::get('TrackingID')]);
        return 'true';
    }
    public function ItemStatus($Id){

        $CaseId=substr($Id, 16);
        $Status= DB::table('refundcase')
            ->select('RefundCaseStatus')
            ->where([
                ['RefundCaseStatusKey', '=', $Id],
                ['RefundCase_Id', '=', $CaseId],
            ])
            ->get();

        return view('Status',['Status'=>json_encode($Status[0]->RefundCaseStatus)]);
    }


}
