<?php namespace App\Http\Controllers;
use Illuminate\Support\Facades\Input;
use DB;
use Session;
class FileController extends Controller {
    public function uploadImage($id) {
        if(Session::has('CaseId')){
            $id=Session::get('CaseId');
        }
        if($id !=-1){

                $image = Input::file('file');
                $destinationPath = storage_path() . '\uploads';
                $imageName=time().'.'.$image->getClientOriginalExtension();
                if(!$image->move($destinationPath,$imageName)) {
                    return $this->errors(['message' => 'Error saving the file.', 'code' => 400]);
                }
            DB::table('caseImages')->insert([
                'RefundCase_Id' =>$id,
                'Image_Path'=>'..\storage\uploads',
                'Image_Name'=>$imageName
            ]);

                return response()->json(['success' => true], 200);
        }
        else{
            return $this->errors(['message' => 'Error saving the file.', 'code' => 400]);
        }
    }

    public function GetAllImages($id){
       $data= DB::table('caseImages')
            ->where('RefundCase_Id', '=', $id)
             ->get();
        return response()->json($data);
    }
}