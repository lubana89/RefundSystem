<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Session;
use Exception;
use DB;
use Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class CustomerController extends Controller
{
    private $Message = 'Thanks for request!! we will contact you soon. ';

    public function __construct()
    {

        $this->mailHandler = new MailController;
    }

    //To generate random strings
    private function generateRandomString($length = 16)
    {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    //Decrypt the encrypted link
    public function DecryptLink($id)
    {
        try {
            $decryptLink = explode("~/", Crypt::decrypt($id));
            Session::put('CaseId', $decryptLink[1]);
            $now = time();
            $your_date = strtotime($decryptLink[0]);
            $datediff = $now - $your_date;
            $daysDiff = floor($datediff / (60 * 60 * 24));
            $Active = DB::table('caselinks')->select('IsActive')->where('RefundCase_Id', '=', $decryptLink[1])->get();
            //Link must not be 30 days old and must be active
            if ($daysDiff < 30 && $Active[0]->IsActive == 1) {

                return view('CustomerRefundForm');
            } else
                return view('errors.InvalidLink');
        } catch (DecryptException  $e) {
            return view('errors.InvalidLink');
        }
    }

    //Generate Qr Code and link for tracking status
    public function GetQR()
    {
        $trackingId = Session::get('TrackingID');
        Session::forget('TrackingID');
        $CasedId = Session::get('CaseId');
        Session::forget('CaseId');
        if ($CasedId != null) {
            DB::table('caselinks')->where('RefundCase_Id', '=', $CasedId)->update(['IsActive' => 0]);//change to 0 for 1 time link
            return view('QR', ['Data' => $CasedId, 'TrackingID' => config('app.url') . '/Status/' . $trackingId]);
        } else {
            return view('errors.InvalidLink');
        }
    }

    //Generate bar Code and link for tracking status
    public function GetBarCode()
    {
        $trackingId = Session::get('TrackingID');
        Session::forget('TrackingID');
        $CasedId = Session::get('CaseId');
        Session::forget('CaseId');
        if ($CasedId != null) {
            DB::table('caselinks')->where('RefundCase_Id', '=', $CasedId)->update(['IsActive' => 0]);//change to 0 for 1 time link
            return view('BarCode', ['Data' => $CasedId, 'TrackingID' => $trackingId]);
        } else {
            return view('errors.InvalidLink');
        }
    }

    //Update Case Related Data
    public function UpdateCaseData(Request $request)
    {
        if (!$request->input('test')) {
            $CaseId = Session::get('CaseId');

            //Generate Tracking Id
            Session::put('TrackingID', $this->generateRandomString() . $CaseId);

            DB::table('refundcase')
                ->where('RefundCase_Id', '=', $CaseId)
                ->update(['RefundCaseDetail' => $request->getContent(), 'RefundCaseStatus' => 'Label Generated', 'RefundCaseStatusKey' => Session::get('TrackingID')]);
            //update case history
            $this->UpdateCaseHistory($CaseId, 'Customer|Label Generated ');
            return 'true';
        } else {
            return response()->json('UP');
        }
    }

    //Get Status of Item
    public function ItemStatus($Id)
    {
        try {
            $CaseId = substr($Id, 16);
            $Status = DB::table('refundcase')->select('RefundCaseStatus')->where([['RefundCaseStatusKey', '=', $Id], ['RefundCase_Id', '=', $CaseId],])->get();
            return view('Status', ['Status' => json_encode($Status[0]->RefundCaseStatus)]);
        } catch (\Exception $e) {
            return view('errors.InvalidLink');
        }
    }

    public function UpdateCaseHistory($id, $message)
    {
        //insert into history
        DB::table('casehistory')->insert(
            ['RefundCase_Id' => $id, 'Time' => date('Y-m-d H:i:s'), 'HistoryLog' => $message]
        );
    }

    public function RequestCase(Request $request)
    {

        if (!$request->input('sellerLink')) {
            $selleremailadress = 'no-reply@oubo.de';

        } else {
            $sellerID = DB::table('seller_links')->select('user_id')->where('link', '=', $request->input('sellerLink'))->get();
            $selleremail = DB::table('users')->select('email')->where('id', '=', $sellerID[0]->user_id)->get();
            $selleremailadress= $selleremail[0]->email;
        }
        $this->mailHandler->Email('Request Case', config('app.url') . '/#/sellerrefundform?customerdata=' . urlencode($request->getContent()),$selleremailadress );
        return $this->Message;
    }
}
