var elixir = require('laravel-elixir');
require('laravel-elixir-js-uglify');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.styles([
        "./CSS/RefundSystem.css"
    ], './Elixer/CSS/all.css');



    mix.scripts([
        "./JS/Global.js",
        "./JS/Controllers/AuthController.js",
        "./JS/Controllers/UserController.js",
        "./JS/Controllers/SellerRefundFormController.js",
        "./JS/Controllers/ManageUserController.js",
        "./JS/Controllers/WarehouseController.js",
        "./JS/Controllers/NotificationController.js",
    ], './Elixer/JS/Controllers/User.js');
    mix.uglify(
        "./Elixer/JS/Controllers/User.js",
        "./Elixer/JS/Controllers"
    );
    mix.scripts([
        "./JS/Controllers/app.js",
        "./Elixer/JS/Controllers/User.js"
    ], './Elixer/JS/Controllers/User.js');


    mix.scripts([
        "./bower_components/jquery-ui/jquery-ui.min.js",
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "./bower_components/satellizer/dist/satellizer.js",
        "./bower_components/angular-file-upload/dist/angular-file-upload.min.js"
    ], './Elixer/JS/Dependencies.js');
    mix.scripts([
        "./JS/Controllers/CustomerController.js"
    ], './Elixer/JS/Controllers/Customer.js');
    mix.scripts([
        "./JS/Controllers/UploaderController.js"
    ], './Elixer/JS/Controllers/Uploader.js');

    mix.uglify(
        "./Elixer/JS/Controllers/Customer.js",
        "./Elixer/JS/Controllers"
    );
    mix.uglify(
        "./Elixer/JS/Controllers/Uploader.js",
        "./Elixer/JS/Controllers"				
    );
});


