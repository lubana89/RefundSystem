<!doctype html>
<html>
<head>
    <meta charset="utf-8">
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
<script src="/RefundSystem/Elixer/JS/OUBO-Dependencies.js"></script>

<!-- Application Scripts-->
<script src="/RefundSystem/Elixer/JS/Controllers/OUBOSeller.js"></script>


</html>
