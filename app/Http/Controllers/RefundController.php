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
class RefundController extends Controller {

    public function GenerateLink(Request $request){
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
        $timeStamp=date("Y/m/d");

        $id =DB::table('refundcase')->insertGetId(
            ['Seller_Id' => $request->sellerNumber, 'RefundCaseDetail' => $request->getContent(),'RefundCaseStatus'=>'Link Generated']
        );
        $refundLink= Crypt::encrypt( $timeStamp.'~/'. $id);
        DB::table('caselinks')->insert(
            ['Seller_Id' => $request->sellerNumber, 'RefundCase_ID' => $id,'Generation_Time'=>$timeStamp,'CaseLink'=>$refundLink]
        );
        return config('app.url').'/Customer/Refund/'.$refundLink;
    }

    public function GetSellerAllCases(Request $request,$Id){
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
        $data= DB::table('refundcase')
            ->select('RefundCaseDetail')
            ->where('Seller_Id', '=',$Id)
            ->get();

       return json_encode($data);
    }

    public function DecryptLink($id){
        try{
        $decryptLink=explode("~/",Crypt::decrypt($id)) ;
            Session::put('CaseId', $decryptLink[1]);
        $now =time();
        $your_date = strtotime($decryptLink[0]);
        $datediff = $now - $your_date;
        $daysDiff= floor($datediff/(60*60*24));
        $Active=DB::table('caselinks')
                ->select('IsActive')
                ->where('RefundCase_Id', '=',$decryptLink[1])
                ->get();

       if($daysDiff<30 && $Active[0]->IsActive==1){

          return view('CustomerRefundForm');
       }


        else
            return view('errors.InvalidLink');
        }
        catch (DecryptException  $e)
        {
            return view('errors.InvalidLink');
        }
    }

}