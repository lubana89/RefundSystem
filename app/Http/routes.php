
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





Route::group(['prefix' => 'api', 'middleware' => ['ability:Admin,Admin']], function()
{
    Route::get('Users', 'AuthenticateController@Index');
    Route::post('CreateUser', 'AuthenticateController@CreateUser');
    Route::post('UpdateUser', 'AuthenticateController@UpdateUser');
    Route::get('DeleteUser/{id}', 'AuthenticateController@DeleteUser');
    Route::get('Roles', 'AuthenticateController@GetRoles');
    Route::post('CreateRole', 'AuthenticateController@CreateRole');
    Route::post('CreatePermission', 'AuthenticateController@CreatePermission');
    Route::post('AssignRole', 'AuthenticateController@AssignRole');
    Route::post('AttachPermission', 'AuthenticateController@AttachPermission');
    Route::get('/AllCases','AuthenticateController@GetAllCases');
    Route::get('/AllWarehouseUsers','FetchBasicDataController@GetAllWarehouseUsers');
    Route::post('/UpdateNotification','CommunicationController@UpdateNotification');
});





Route::group(['prefix' => 'Seller', 'middleware' => ['ability:Admin|Seller,Seller']], function()
{
    Route::post('/GenerateRefundLink','SellerController@GenerateLink');
    Route::get('/AllCases/{id}','SellerController@GetSellerAllCases');
    Route::get('/DeleteCase/{id}','SellerController@DeleteCase');
    Route::post('/UpdateCaseData/{id}','SellerController@UpdateCase');
    Route::get('/GetLink/{id}','SellerController@GetCaseLink');
    Route::get('/GetAllAdmins','FetchBasicDataController@GetAllAdmins');

});


Route::group(['prefix' => 'Warehouse', 'middleware' => ['ability:Admin|Warehouse,Warehouse']], function()
{
    Route::get('/AllReturnedCases','WarehouseController@GetAllReturnedCases');
    Route::post('/UpdateCaseStatus','WarehouseController@UpdateCaseStatus');
    Route::get('/ReturnedCase/{id}','WarehouseController@GetReturnedCase');
    Route::post('/UpdateCaseData/{id}','WarehouseController@UpdateCase');

    Route::get('/GetAllSellers','FetchBasicDataController@GetAllSellers');

});
Route::group(['prefix' => 'Communication', 'middleware' => ['ability:All,Communication']], function()
{
    Route::post('/SendNotification','CommunicationController@SendNotification');
    Route::post('/AddMessage','CommunicationController@AddMessage');
    Route::get('/GetAllMessage/{id}','CommunicationController@GetAllMessage');
    Route::get('/GetNotificationCount/{id}','CommunicationController@GetNotificationCount');
    Route::get('/GetTopFiveNotifications/{id}','CommunicationController@GetTopFiveNotifications');
    Route::get('/MarkAllNotificationRead/{id}','CommunicationController@MarkAllNotificationRead');
    Route::get('/GetAllNotifications/{id}','CommunicationController@GetAllNotifications');
    //1 is for Mark read
    Route::get('/MarkRead/{id}','CommunicationController@MarkRead');
    Route::get('/MarkUnRead/{id}','CommunicationController@MarkUnRead');
    Route::post('/ReplyNotification','CommunicationController@ReplyNotification');
    Route::get('/GetChainNotifications/{id}','CommunicationController@GetChainNotifications');

});
Route::post('/UpdateCaseData','CustomerController@UpdateCaseData');
Route::get('/Customer/Refund/{id}/Fetch','FetchBasicDataController@FetchData');
Route::get('/Customer/Refund/{id}', 'SellerController@DecryptLink');
Route::get('/wish', 'FetchBasicDataController@GetWishes');
Route::get('/reason', 'FetchBasicDataController@GetReasons');
Route::get('/itemCondition', 'FetchBasicDataController@GetConditions');
Route::get('/QR', 'CustomerController@GetQR');
Route::get('/Status/{id}', 'CustomerController@ItemStatus');
Route::get('logout','AuthenticateController@logout');

/*image upload*/
Route::post('/File/Upload/{id}', 'FileController@uploadImage');
Route::get('/File/GetAllImages/{id}','FileController@GetAllImages');