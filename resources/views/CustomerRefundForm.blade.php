
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">

    <title>Refund Form</title>
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
    <link href="/RefundSystem/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/RefundSystem/Elixer/CSS/all.css">
    <script src="/RefundSystem/Elixer/JS/Dependencies.js"></script>
    <script src="/RefundSystem/Elixer/JS/Controllers/Customer.js"></script>
    @include('Configuration.Configuration')

</head>

<body>


<div ng-app="Customer" ng-controller="CustomerRefundCtrl">
    <form id="imageform" role="form" ng-submit="SubmitImage()" enctype="multipart/form-data">
       upload image:

        <div  class="" style="margin: 1%">
        <input   type="file" id="fileToUpload">
        </div>
        <button type="submit" style="margin: 1%" class="btn btn-success" ><span class="glyphicon glyphicon-upload"> Upload</span></button>
    </form>
    <form class="form-horizontal" name="CustomerForm" novalidate role="form" style="margin-top:5%;" ng-submit="CustomerForm.$valid && SubmitForm()" >
        <input class="form-control" id="sellerId" ng-model="form.sellerNumber" type="hidden">
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Customer Email</label>
            <div class="col-sm-4">
                <input class="form-control" name="email"   ng-model="form.emailAddress" ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/">
                <span ng-show="CustomerForm.email.$error.pattern">Not a valid mail!</span>
            </div>

        </div>

        <div class="form-group">
            <label for="orderId" class="col-sm-2 control-label">Order Number</label>
            <div class="col-sm-4">
                <input class="form-control"  ng-model="form.orderNumber" >
            </div>

        </div>
        <div class="form-group">
            <label for="itemSKU" class="col-sm-2 control-label">Item SKU</label>
            <div class="col-sm-4">
                <input class="form-control"  ng-model="form.itemSKU" >
            </div>

        </div>
        <div class="form-group">
            <label for="price" class="col-sm-2 control-label">Price</label>
            <div class="col-sm-4">
                <input class="form-control"  ng-model="form.price" >
            </div>

        </div>
        <div class="form-group">
            <label for="date" class="col-sm-2 control-label">Date</label>
            <div class="col-sm-4">
                <input class="form-control date"  type="text" jqdatepicker ng-model="form.date" >
            </div>

        </div>

        <div class="form-group">
            <label for="reason" class="col-sm-2 control-label">Reason</label>
            <div class="col-sm-4" >
                <select ng-model="form.reason" ng-options="x for x in reasons">
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="itemCondition" class="col-sm-2 control-label">Item Condition</label>
            <div class="col-sm-4">
                <select ng-model="form.condition" ng-options="x for x in conditions">
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="wish" class="col-sm-2 control-label">Wish</label>
            <div class="col-sm-4">
                <select ng-model="form.wish" ng-options="x for x in wishes">
                </select>
            </div>
        </div>


        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-success" ><span class="glyphicon glyphicon-qrcode"></span></button>
            </div>
        </div>

    </form>


</div>

</body>
</html>
