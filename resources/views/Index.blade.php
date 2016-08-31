<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
    <script>
        window.$ = window.jQuery;
    </script>
    <link rel="stylesheet" href="/RefundSystem/bower_components/jquery-ui/themes/base/jquery-ui.min.css">
    <link rel="stylesheet" href="/RefundSystem/bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/RefundSystem/Elixer/CSS/all.css">
    @include('Configuration.Configuration')
</head>
<body ng-app="RefundSystemApp">

<div class="container">
    <div ui-view></div>
</div>

</body>

<!-- Application Dependencies-->
<script type="text/javascript" src="/RefundSystem/Elixer/JS/Dependencies.js"></script>

<!-- Application Scripts-->
<script type="text/javascript" src="/RefundSystem/Elixer/JS/Controllers/User.js"></script>
<!-- Insert this line after script imports -->
<script>if (window.module) module = window.module;</script>

</html>
