<?php
namespace App\Http\Controllers;
use DB;
use Illuminate\Support\Facades\Auth;
class LogController extends Controller {


public function Log($controller,$action,$content){

   DB::table('log')->insert(
        ['User_Id' => Auth::id(), 'Controller' => $controller,'Action'=>$action,'Content'=>$content]
    );
}

}