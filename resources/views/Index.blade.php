<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/RefundSystem/bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/RefundSystem/bower_components/jquery-ui/themes/base/jquery-ui.min.css">
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
<script src="/RefundSystem/JS/Controllers/SellerController.js"></script>

</html>
