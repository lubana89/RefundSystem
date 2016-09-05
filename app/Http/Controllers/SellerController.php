<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Crypt;
use DB;
use Session;
use JWTAuth;
use App\Http\Controllers\LogController;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Contracts\Encryption\DecryptException;
class SellerController extends Controller {

    private $log;
    public function __construct()  {
       $this->log = new LogController;
    }
    //Generate Link For the Customer Refund
    public function GenerateLink(Request $request){
        $timeStamp=date("Y/m/d");
        $id =DB::table('refundcase')->insertGetId(
            ['Seller_Id' => $request->sellerNumber, 'RefundCaseDetail' => $request->getContent(),'RefundCaseStatus'=>'Link Generated','RefundCaseStatusKey'=>'']
        );
        $refundLink= Crypt::encrypt( $timeStamp.'~/'. $id);
        DB::table('caselinks')->insert(
            ['Seller_Id' => $request->sellerNumber, 'RefundCase_Id' => $id,'Generation_Time'=>$timeStamp,'CaseLink'=>$refundLink]
        );
        //Log
        $this->log->Log('SellerController','GenerateLink',$request->getContent());
        return config('app.url').'/Customer/Refund/'.$refundLink;
    }

    //Fetch All cases belongs to seller
    public function GetSellerAllCases($Id){
        $data= DB::table('refundcase')->select('RefundCaseDetail','RefundCase_Id','RefundCaseStatusKey')->where('Seller_Id', '=',$Id)->get();
       return json_encode($data);
    }

    // Delete Case By Id
    public function DeleteCase($id){

        DB::table('refundcase')->where('RefundCase_Id', '=', $id)->delete();
        DB::table('caselinks')->where('RefundCase_Id', '=', $id)->delete();

        //Log
        $this->log->Log('SellerController','DeleteCase','Case Deleted, id='.$id);
    }

    //Update Case Data
    public function UpdateCase(Request $request,$id){

        DB::table('refundcase')->where('RefundCase_Id', '=',$id)->update(['RefundCaseDetail' => $request->getContent()]);
        //Log
        $this->log->Log('SellerController','UpdateCase','Case Updated, id='.$id.' Updated Data='.$request->getContent());
       return 'true';
    }

    //Get Case Link with case id
    public function GetCaseLink($id){
        $refundLink=DB::table('caselinks')->select('CaseLink')->where('RefundCase_Id', '=', $id)->get();
        return config('app.url').'/Customer/Refund/'.$refundLink[0]->CaseLink;
    }

}