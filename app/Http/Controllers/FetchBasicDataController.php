<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
use Session;
use App\User;
class FetchBasicDataController extends Controller
{
    public function FetchData ($id){
       $CaseData= DB::table('refundcase')->where('RefundCase_Id',Session::get('CaseId'))->first();
        return  $CaseData->RefundCaseDetail;
    }
    public function GetWishes (){
        return DB::table('wish')->get();
    }
    public function GetReasons (){
        return DB::table('reason')->get();
    }
    public function GetConditions (){
        return DB::table('itemcondition')->get();
    }
    public function GetAllSellers(){
        $data=  User::whereHas('roles', function($q)
        {
            $q->where('name', 'Seller');
        })->get();
        return response()->json($data);
    }
    public function GetAllAdmins(){
        $data=  User::whereHas('roles', function($q)
        {
            $q->where('name', 'Admin');
        })->get();

        return response()->json($data);
    }
    public function GetAllWarehouseUsers(){
        $data=  User::whereHas('roles', function($q)
        {
            $q->where('name', 'Warehouse');
        })->get();

        return response()->json($data);
    }
}
