<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use App\Permission;
use App\Role;
use DB;
use Hash;
use DateTime;
use Illuminate\Support\Facades\Auth;

class WarehouseController extends Controller
{
    private $log;

    public function __construct()
    {
        $this->log = new LogController;
    }

    //Fetch All Closed Cases
    public function GetAllArchivedCases()
    {
        $data = DB::table('refundcase')
            ->where('RefundCaseStatus', '=', 'refund-close case')
            ->get();
        return response()->json($data);
    }
    //Future Cases
    public function GetAllForecastCases()
    {
        $data = DB::table('refundcase')
            ->where('RefundCaseStatus', '=', 'Label Generated')
            ->get();
        return response()->json($data);
    }
    //Buffer Cases
    public function GetAllCasesInBuffer()
    {
        $data = DB::table('refundcase')
            ->where([
                ['RefundCaseStatus', '<>', 'Label Generated'],
                ['RefundCaseStatus', '<>', 'refund-close case'],
                ['RefundCaseStatus', '<>', 'Link Generated']
            ])
            ->get();
        return response()->json($data);
    }
    //update case status of returned items
    public function UpdateCaseStatus(Request $request)
    {
        DB::table('refundcase')
            ->where('RefundCase_Id', '=', $request->input('RefundCase_Id'))
            ->update(['RefundCaseStatus' => $request->input('RefundCaseStatus')]);
        //Log
        $this->log->Log('WarehouseController', 'UpdateCaseStatus', 'Updated Case Status Id=' . $request->input('RefundCase_Id') . ' Status=' . $request->input('RefundCaseStatus'));
        return 'true';
    }

    // fetch Case by id
    public function GetReturnedCase($id)
    {
        $data = DB::table('refundcase')
            ->where('RefundCase_Id', '=', $id)
            ->get();
        return response()->json($data);
    }

    // update case
    public function UpdateCase(Request $request, $id)
    {
        if (!$request->input('test')) {
            DB::table('refundcase')
                ->where('RefundCase_Id', '=', $id)
                ->update(['RefundCaseDetail' => $request->getContent()]);
            //Log
            $this->log->Log('WarehouseController', 'UpdateCase', 'Updated Case Id=' . $id . ' Updated Data=' . $request->getContent());
            return 'true';
        } else {
            return response()->json('UP');
        }
    }


}