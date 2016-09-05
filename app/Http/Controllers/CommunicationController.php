<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use Session;
use Exception;
use DB;
class CommunicationController extends Controller
{

    private $log;
    public function __construct()  {
        $this->log = new LogController;
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
            ->where('notifications.child_id', '=', null)
            ->orderBy('notifications.id', 'DESC')
            ->select('notifications.id as Id',
                'notifications.parent_id as ParentId',
                'notifications.is_read as Read',
                'notifications.notificationMsg as Message',
                'notifications.sent_at as Date', 'u.name as From',
                'notifications.from_user_id as ReplyBackTo')
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
    public function SendNotification(Request $request){
        DB::table('notifications')->insert([
            'from_user_id' => $request->input('from_user_id'),
            'to_user_id' => $request->input('to_user_id'),
            'notificationMsg' => $request->input('notificationMsg')
        ]);
        //Log
        $this->log->Log('CommunicationController','SendNotification','data from_user_id ='.$request->input('from_user_id').'to_user_id='.$request->input('to_user_id').' notificationMsg='.$request->input('notificationMsg'));

    }
    public function ReplyNotification(Request $request){

       $childId= DB::table('notifications')->insertGetId([
            'parent_id'=>$request->input('parent_id'),
            'from_user_id' => $request->input('from_user_id'),
            'to_user_id' => $request->input('to_user_id'),
            'notificationMsg' => $request->input('notificationMsg')
        ]);
        /*update parent message*/
        DB::table('notifications')
            ->where('id', '=',$request->input('parent_id'))
            ->update(['is_read' =>1,'child_id'=>$childId]);

        //Log
        $this->log->Log('CommunicationController','ReplyNotification','data from_user_id ='.$request->input('from_user_id').'to_user_id='.$request->input('to_user_id').' notificationMsg='.$request->input('notificationMsg'));

        return 'true';
    }
    public function AddMessage(Request $request){
        DB::table('casemessages')->insert([
            'RefundCase_Id' => $request->input('RefundCase_Id'),
            'From_name' => $request->input('From_name'),
            'Seller_Id' => $request->input('Seller_Id'),
            'Message'=>$request->input('Message')
        ]);
        //Log
        $this->log->Log('CommunicationController','AddMessage','data RefundCase_Id='.$request->input('RefundCase_Id').' From_name ='.$request->input('From_name').' Seller_Id='.$request->input('Seller_Id').' Message='.$request->input('Message'));

        return 'true';
    }
    public function GetChainNotifications($id){
        $data=[];
        do {
            $row= DB::table('notifications')
                ->join('users as u', 'notifications.from_user_id', '=', 'u.id')
                ->where('notifications.id', '=', $id)
                ->select(
                    'u.name as From_name',
                    'notifications.notificationMsg as Message',
                    'notifications.sent_at as DateTime',
                    'notifications.parent_id'
                )
                ->get();
            array_push($data,$row[0]);
           $id=json_decode(json_encode($row[0]), True)['parent_id'];
            if($id==null){
                $i=0;
            }else{
                $i=$id;
            }
        } while ($i > 0);

        return response()->json($data);
    }
    public function UpdateNotification(Request $request){
        DB::table('notifications')
            ->where('id', '=',$request->input('id'))
            ->update(['to_user_id' =>$request->input('to_user_id'),'is_read' =>0]);
        //Log
        $this->log->Log('CommunicationController','UpdateNotification','Forward Notification - Notification Id='.$request->input('id').' to_user_id='.$request->input('to_user_id'));

        return 'true';
    }

}
