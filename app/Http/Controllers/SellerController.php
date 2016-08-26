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
class SellerController extends Controller {



    public function GenerateLink(Request $request){
        $timeStamp=date("Y/m/d");
        $id =DB::table('refundcase')->insertGetId(
            ['Seller_Id' => $request->sellerNumber, 'RefundCaseDetail' => $request->getContent(),'RefundCaseStatus'=>'Link Generated','RefundCaseStatusKey'=>'']
        );
        $refundLink= Crypt::encrypt( $timeStamp.'~/'. $id);
        DB::table('caselinks')->insert(
            ['Seller_Id' => $request->sellerNumber, 'RefundCase_Id' => $id,'Generation_Time'=>$timeStamp,'CaseLink'=>$refundLink]
        );
        return config('app.url').'/Customer/Refund/'.$refundLink;
    }

    public function GetSellerAllCases($Id){
        $data= DB::table('refundcase')
            ->select('RefundCaseDetail','RefundCase_Id','RefundCaseStatusKey')
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
    public function DeleteCase($id){

        DB::table('refundcase')->where('RefundCase_Id', '=', $id)->delete();
        DB::table('caselinks')->where('RefundCase_Id', '=', $id)->delete();
    }
    public function UpdateCase(Request $request,$id){

        DB::table('refundcase')
            ->where('RefundCase_Id', '=',$id)
            ->update(['RefundCaseDetail' => $request->getContent()]);
       return 'true';
    }
    public function GetCaseLink($id){

        $refundLink=DB::table('caselinks')
            ->select('CaseLink')
            ->where('RefundCase_Id', '=', $id)
            ->get();
        return config('app.url').'/Customer/Refund/'.$refundLink[0]->CaseLink;
    }
    public function GetAllMessage($id){
        $data= DB::table('casemessages')
            ->where('RefundCase_Id', '=', $id)
            ->get();
        return response()->json($data);
    }
    public function GetNotificationCount($id){
        $data= DB::table('notifications')
            ->where('to_user_id', '=', $id)
            ->where('is_read', '=', 0)
            ->count();
        return response()->json($data);

    }
    public function GetTopFiveNotifications($id){
        $data= DB::table('notifications')
            ->join('users as u', 'notifications.from_user_id', '=', 'u.id')
            ->where('notifications.to_user_id', '=', $id)
            ->where('notifications.is_read', '=', 0)
            ->orderBy('notifications.id', 'DESC')
            ->select('notifications.notificationMsg as Message', 'notifications.sent_at as DateTime', 'u.name as From_name')
            ->paginate(15);
        return response()->json($data);

    }
    public function GetAllNotifications($id){
        $data= DB::table('notifications')
            ->join('users as u', 'notifications.from_user_id', '=', 'u.id')
            ->where('notifications.to_user_id', '=', $id)
            ->orderBy('notifications.id', 'DESC')
            ->select('notifications.id as Id','notifications.is_read as Read','notifications.notificationMsg as Message', 'notifications.sent_at as Date', 'u.name as From')
            ->get();
        return response()->json($data);
    }
    public function MarkAllNotificationRead($id){
        DB::table('notifications')
            ->where('to_user_id', '=',$id)
            ->update(['is_read' =>1]);
        return 'true';
    }
    public function MarkRead($id){
        DB::table('notifications')
            ->where('id', '=',$id)
            ->update(['is_read' =>1]);
        return 'true';
    }
    public function MarkUnRead($id){
        DB::table('notifications')
            ->where('id', '=',$id)
            ->update(['is_read' =>0]);
        return 'true';
    }
}