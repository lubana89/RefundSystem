<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Crypt;
use DB;
use Session;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Contracts\Encryption\DecryptException;

class SellerController extends Controller
{

    private $log;
    private $mailHandler;
    private $htmlGeneratedLinkMessage = 'Dear Seller,
                                       <br/>
                                       We have sent you a Refund-Link via E-mail,
                                       <br/><br/>
                                       Please Forward it to your <mark><b>CUSTOMER</b></mark> for Refund Code Generation.
                                       <br/><br/>
                                       Regards
                                       <br/>
                                       Team OUBO';

    public function __construct()
    {
        $this->log = new LogController;
        $this->mailHandler = new MailController;
    }

    //Generate Link For the Customer Refund
    public function GenerateLink(Request $request)
    {
        if (!$request->input('test')) {
            $timeStamp = date("Y/m/d");
            //insert new
            $id = DB::table('refundcase')->insertGetId(
                ['Seller_Id' => $request->sellerNumber, 'RefundCaseDetail' => $request->getContent(), 'RefundCaseStatus' => 'Link Generated', 'RefundCaseStatusKey' => '']
            );
            //update case history
            $this->UpdateCaseHistory($id,'Seller|LinkGenerated');

            //insert to keep check for link generated and active
            $refundLink = Crypt::encrypt($timeStamp . '~/' . $id);
            DB::table('caselinks')->insert(
                ['Seller_Id' => $request->sellerNumber, 'RefundCase_Id' => $id, 'Generation_Time' => $timeStamp, 'CaseLink' => $refundLink]
            );

            //Log
            $this->log->Log('SellerController', 'GenerateLink', $request->getContent());
            $this->mailHandler->Email('Refund Link', config('app.url') . '/Customer/Refund/' . $refundLink);
            return $this->htmlGeneratedLinkMessage;

        } else {
            return response()->json('UP');
        }
    }

    //Update Case Data
    public function UpdateCase(Request $request, $id)
    {
        if (!$request->input('test')) {
            DB::table('refundcase')->where('RefundCase_Id', '=', $id)->update(['RefundCaseDetail' => $request->getContent()]);
            //update case history
            $this->UpdateCaseHistory($id,'Seller|Updated');
            //Log
            $this->log->Log('SellerController', 'UpdateCase', 'Case Updated, id=' . $id . ' Updated Data=' . $request->getContent());
            return 'true';
        } else {
            return response()->json('UP');
        }
    }

    //Fetch All cases belongs to seller
    public function GetSellerAllCases($Id)
    {
        $data = DB::table('refundcase')->select('RefundCaseDetail', 'RefundCase_Id', 'RefundCaseStatusKey')->where('Seller_Id', '=', $Id)->get();
        return json_encode($data);
    }

    // Delete Case By Id
    public function DeleteCase($id)
    {

        DB::table('refundcase')->where('RefundCase_Id', '=', $id)->delete();
        DB::table('caselinks')->where('RefundCase_Id', '=', $id)->delete();
        DB::table('caseimages')->where('RefundCase_Id', '=', $id)->delete();
        DB::table('casemessages')->where('RefundCase_Id', '=', $id)->delete();
        DB::table('casehistory')->where('RefundCase_Id', '=', $id)->delete();
        //Log
        $this->log->Log('SellerController', 'DeleteCase', 'Case Deleted, id=' . $id);
    }


    //Get Case Link with case id
    public function GetCaseLink($id)
    {
        $refundLink = DB::table('caselinks')->select('CaseLink')->where('RefundCase_Id', '=', $id)->get();
        return config('app.url') . '/Customer/Refund/' . $refundLink[0]->CaseLink;
    }

    public function UpdateCaseHistory($id,$message)
    {
        //insert into history
        DB::table('casehistory')->insert(
            ['RefundCase_Id' => $id, 'Time' => date('Y-m-d H:i:s'), 'HistoryLog' => $message]
        );
    }

    public function GetMailLink($id)
    {
        $refundLink = DB::table('caselinks')->select('CaseLink')->where('RefundCase_Id', '=', $id)->get();
        $this->mailHandler->Email('Refund Link', config('app.url') . '/Customer/Refund/' . $refundLink[0]->CaseLink);
        return $this->htmlGeneratedLinkMessage;
    }
}