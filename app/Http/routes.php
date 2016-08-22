
<?php
Blade::setContentTags('<$', '$>');        // for variables and all things Blade
Blade::setEscapedContentTags('<$$', '$$>');   // for escaped data

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
/*Authentication*/
Route::get('/',['as' => 'home', function () {
    return view('Index');
}]);

Route::group(['prefix' => 'api'], function()
{
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@GetAuthenticatedUser');
    Route::get('GetRole','AuthenticateController@GetRole');
});





Route::group(['prefix' => 'api', 'middleware' => ['ability:Admin,user-role-permission']], function()
{
    // Protected route
    Route::get('Users', 'AuthenticateController@Index');
    Route::post('CreateUser', 'AuthenticateController@CreateUser');
    Route::post('UpdateUser', 'AuthenticateController@UpdateUser');
    Route::get('DeleteUser/{id}', 'AuthenticateController@DeleteUser');
    Route::get('Roles', 'AuthenticateController@GetRoles');
    Route::post('CreateRole', 'AuthenticateController@CreateRole');
    Route::post('CreatePermission', 'AuthenticateController@CreatePermission');

    Route::post('AssignRole', 'AuthenticateController@AssignRole');
    Route::post('AttachPermission', 'AuthenticateController@AttachPermission');

    Route::get('/AllReturnedCases','AuthenticateController@GetAllReturnedCases');

    Route::post('UpdateCaseStatus','AuthenticateController@UpdateCaseStatus');
});





Route::group(['prefix' => 'Seller', 'middleware' => ['ability:Admin|Seller,RefundCase']], function()
{
    Route::post('/GenerateRefundLink','SellerController@GenerateLink');

    Route::get('/AllCases/{id}','SellerController@GetSellerAllCases');
    Route::get('/DeleteCase/{id}','SellerController@DeleteCase');
    Route::post('/UpdateCaseData/{id}','SellerController@UpdateCase');
    Route::get('/GetLink/{id}','SellerController@GetCaseLink');
});


Route::post('/UpdateCaseData','CustomerController@UpdateCaseData');
Route::get('/Customer/Refund/{id}/Fetch','FetchBasicDataController@FetchData');
Route::get('/Customer/Refund/{id}', 'SellerController@DecryptLink');
Route::get('/wish', 'FetchBasicDataController@GetWishes');
Route::get('/reason', 'FetchBasicDataController@GetReasons');
Route::get('/itemCondition', 'FetchBasicDataController@GetConditions');
Route::get('/QR', 'CustomerController@GetQR');
Route::get('/Status/{id}', 'CustomerController@ItemStatus');

