
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">

    <title>Refund Form</title>

    <link href="/RefundSystem/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="/RefundSystem/bower_components/angular/angular.min.js"></script>
    <script src="/RefundSystem/bower_components/angular-local-storage/dist/angular-local-storage.min.js"></script>
    <script src="/RefundSystem/bower_components/restangular/dist/restangular.min.js"></script>
    <script src="/RefundSystem/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="/RefundSystem/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="/RefundSystem/JS/Controllers/CustomerController.js"></script>
    @include('Configuration.Configuration');
</head>

<body>
<div ng-app="Customer">
    <form class="form-horizontal" role="form" style="margin-top:5%;" action="#" ng-controller="CustomerRefundCtrl">
        <input class="form-control" id="sellerId" ng-model="form.sellerNumber" type="hidden">
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Customer Email</label>
            <div class="col-sm-4">
                <input class="form-control" id="email"   ng-model="form.emailAddress" required>
            </div>

        </div>

        <div class="form-group">
            <label for="orderId" class="col-sm-2 control-label">Order Number</label>
            <div class="col-sm-4">
                <input class="form-control" id="orderId" ng-model="form.orderNumber" required>
            </div>

        </div>
        <div class="form-group">
            <label for="itemSKU" class="col-sm-2 control-label">Item SKU</label>
            <div class="col-sm-4">
                <input class="form-control" id="itemSKU" ng-model="form.itemSKU" required>
            </div>

        </div>
        <div class="form-group">
            <label for="price" class="col-sm-2 control-label">Price</label>
            <div class="col-sm-4">
                <input class="form-control" id="price" ng-model="form.price" required>
            </div>

        </div>
        <div class="form-group">
            <label for="date" class="col-sm-2 control-label">Date</label>
            <div class="col-sm-4">
                <input class="form-control" id="date" type="datetime" ng-model="form.date" required>
            </div>

        </div>

        <div class="form-group">
            <label for="reason" class="col-sm-2 control-label">Reason</label>
            <div class="col-sm-4">
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

        <$--<div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <label class="btn btn-info btn-file">
                    Upload Image(s) <input type="file" style="display: none;" name="refundImages" multiple>
                </label>
            </div>
        </div>--$>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-success" ng-click="SubmitForm()">Submit</button>
            </div>
        </div>

    </form>


</div>

</body>
</html>
