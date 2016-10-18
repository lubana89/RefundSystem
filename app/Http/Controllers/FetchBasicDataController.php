<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
use Session;
use App\User;

class FetchBasicDataController extends Controller
{
    // Fetching Data Related To Case
    public function FetchData()
    {
        $CaseData = DB::table('refundcase')->where('RefundCase_Id', Session::get('CaseId'))->first();
        return $CaseData->RefundCaseDetail;
    }

    //Fetch All wishes from DB
    public function GetWishes()
    {
        return DB::table('wish')->get();
    }

    public function GetStatusAction()
    {
        return DB::table('warehouseitem_status_action')->get();
    }

    //Fetch All Reasons from DB
    public function GetReasons()
    {
        return DB::table('reason')->get();
    }

    //Fetch All Conditions from DB
    public function GetConditions()
    {
        return DB::table('itemcondition')->get();
    }

    //Fetch All Sellers by name from DB
    public function GetAllSellers()
    {
        $data = User::whereHas('roles', function ($q) {
            $q->where('name', 'Seller');
        })->get();
        return response()->json($data);
    }

    //Fetch All Admins by name from DB
    public function GetAllAdmins()
    {
        $data = User::whereHas('roles', function ($q) {
            $q->where('name', 'Admin');
        })->get();

        return response()->json($data);
    }

    //Fetch All Warehouse users by name from DB
    public function GetAllWarehouseUsers()
    {
        $data = User::whereHas('roles', function ($q) {
            $q->where('name', 'Warehouse');
        })->get();

        return response()->json($data);
    }
}
