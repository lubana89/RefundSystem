<?php namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use DB;
use Session;

class FileController extends Controller
{
    private $log;

    public function __construct()
    {
        $this->log = new LogController;
    }

    //Upload Case Images
    public function uploadImage($id)
    {
        if (!$id=='test') {
        if (Session::has('CaseId')) {
            $id = Session::get('CaseId');
        }
        if ($id != -1) {
            $image = Input::file('file');
            $destinationPath = storage_path() . '\uploads';
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            if (!$image->move($destinationPath, $imageName)) {
                return $this->errors(['message' => 'Error saving the file.', 'code' => 400]);
            }
            //Image path inserted into database
            DB::table('caseImages')->insert(['RefundCase_Id' => $id, 'Image_Path' => '..\storage\uploads', 'Image_Name' => $imageName]);
            //Log
            $this->log->Log('FileController', 'uploadImage', 'CaseId=' . $id . ' Image Name' . $imageName);
            return response()->json(['success' => true], 200);
        } else {
            return $this->errors(['message' => 'Error saving the file.', 'code' => 400]);
        }
        } else {
            return response()->json('UP');
        }
    }

    //Fetch All Images Related To Case
    public function GetAllImages($id)
    {
        $data = DB::table('caseImages')->where('RefundCase_Id', '=', $id)->get();
        return response()->json($data);
    }
}