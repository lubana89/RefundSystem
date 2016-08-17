<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/RefundSystem/bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/RefundSystem/bower_components/jquery-ui/themes/base/jquery-ui.min.css">
    <style type="text/css">
        select{width:200px}
        form {
            background: -webkit-linear-gradient(bottom, #CCCCCC, #EEEEEE 175px);
            background: -moz-linear-gradient(bottom, #CCCCCC, #EEEEEE 175px);
            background: linear-gradient(bottom, #CCCCCC, #EEEEEE 175px);
            margin: auto;
            position: relative;
            width: 550px;
            font-family: Tahoma, Geneva, sans-serif;
            font-size: 14px;
            font-style: italic;
            line-height: 24px;
            font-weight: bold;
            color: black;
            text-decoration: none;
            border-radius: 10px;
            padding: 10px;
            border: 1px solid #999;
            border: inset 1px solid #333;
            -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
        }
    </style>
    @include('Configuration.Configuration')
</head>
<body ng-app="RefundSystemApp">

<div class="container">
    <div ui-view></div>
</div>

</body>

<!-- Application Dependencies-->

<script src="/RefundSystem/bower_components/angular/angular.min.js"></script>
<script src="/RefundSystem/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="/RefundSystem/bower_components/satellizer/dist/satellizer.js"></script>
<script src="/RefundSystem/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/RefundSystem/bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Application Scripts-->
<script src="/RefundSystem/JS/Controllers/app.js"></script>
<script src="/RefundSystem/JS/Controllers/AuthController.js"></script>
<script src="/RefundSystem/JS/Controllers/UserController.js"></script>
<script src="/RefundSystem/JS/Controllers/SellerRefundFormController.js"></script>

<script>
    /*Global Variable*/
    var user;

   /*Global Function*/
    function Logout($auth,$rootScope,$state) {
        $auth.logout().then(function() {

            localStorage.removeItem('user');
            $rootScope.authenticated = false;
            $rootScope.currentUser = null;
            $state.go('auth');
        });

    }
</script>
</html>
