var elixir = require('laravel-elixir');

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
        "./CSS/OUBO.css"
    ], './Elixer/CSS/all.css');
    mix.scripts([
        "./JS/Controllers/app.js",
        "./JS/Controllers/AuthController.js",
        "./JS/Controllers/UserController.js",
        "./JS/Controllers/SellerRefundFormController.js",
        "./JS/Global.js"
    ], './Elixer/JS/Controllers/OUBOSeller.js');
    mix.scripts([
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "./bower_components/satellizer/dist/satellizer.js",
        "./bower_components/jquery/dist/jquery.min.js",
        "./bower_components/jquery-ui/jquery-ui.min.js"
    ], './Elixer/JS/OUBO-Dependencies.js');
    mix.scripts([
        "./JS/Controllers/CustomerController.js"
    ], './Elixer/JS/Controllers/OUBOCustomer.js');
});


