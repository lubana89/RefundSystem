<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/iScroll/5.1.3/iscroll.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/drawer/3.2.0/js/drawer.min.js"></script>
    <script>
        window.$ = window.jQuery;
    </script>
    @include('Configuration.Configuration')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/drawer/3.2.0/css/drawer.min.css">
    <link rel="stylesheet" href="/RefundSystem/bower_components/jquery-ui/themes/base/jquery-ui.min.css">
    <link rel="stylesheet" href="/RefundSystem/bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/RefundSystem/Elixer/CSS/all.css">
    <!-- Application Dependencies-->
    <script type="text/javascript" src="/RefundSystem/Elixer/JS/Dependencies.js"></script>

    <!-- Application Scripts-->
    <script type="text/javascript" src="/RefundSystem/Elixer/JS/Controllers/app.js"></script>
    <script type="text/javascript" src="/RefundSystem/Elixer/JS/Controllers/User.js"></script>
    <script src="/RefundSystem/Elixer/JS/Controllers/Uploader.js"></script>

</head>

<body ng-app="RefundSystemApp">
<div class="container">
    <div ui-view></div>
</div>

</body>


<!-- Insert this line after script imports -->
<script>if (window.module) module = window.module;</script>

</html>
