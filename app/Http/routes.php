
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
Route::get('/', function () {
    return view('Index');
});
Route::group(['prefix' => 'api'], function()
{
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
});
/*Authentication End*/
/*Secured calls*/
Route::post('/GenerateRefundLink','SellerController@GenerateLink');


Route::get('/Seller/AllCases/{id}','SellerController@GetSellerAllCases');
Route::get('/Seller/DeleteCase/{id}','SellerController@DeleteCase');
Route::post('/Seller/UpdateCaseData/{id}','SellerController@UpdateCase');
Route::get('/Seller/GetLink/{id}','SellerController@GetCaseLink');
/*End*/

Route::post('/UpdateCaseData','CustomerController@UpdateCaseData');
Route::get('/Customer/Refund/{id}/Fetch','FetchBasicDataController@FetchData');
Route::get('/Customer/Refund/{id}', 'SellerController@DecryptLink');
Route::get('/wish', 'FetchBasicDataController@GetWishes');
Route::get('/reason', 'FetchBasicDataController@GetReasons');
Route::get('/itemCondition', 'FetchBasicDataController@GetConditions');
Route::get('/QR', 'CustomerController@GetQR');
Route::get('/Status/{id}', 'CustomerController@ItemStatus');

