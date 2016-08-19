<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
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
<script src="/RefundSystem/Elixer/JS/Controllers/OUBO-User.js"></script>


</html>
