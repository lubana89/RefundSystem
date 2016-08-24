<div ng-controller="SellerRefundFormCtrl">
    <div class="btn-group" style="margin:2%">
        <button class="btn btn-success" ng-click="Back()"><span class="glyphicon glyphicon-arrow-left"></span></button>
        <button class="btn btn-danger" ng-click="logout()"><span class="glyphicon glyphicon-log-out"></span></button>
    </div>
    <form class="form-horizontal" name="SellerForm" novalidate role="form" style="margin-top:5%;" ng-submit="SellerForm.$valid && SubmitForm()" >

        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Customer Email</label>
            <div class="col-sm-4">
                <input class="form-control" name="email"   ng-model="form.emailAddress" ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/">
                <span ng-show="SellerForm.email.$error.pattern">Not a valid mail!</span>
            </div>

        </div>

        <div class="form-group">
            <label for="orderId" class="col-sm-2 control-label">Order Number</label>
            <div class="col-sm-4">
                <input class="form-control" ng-model="form.orderNumber" >
            </div>

        </div>
        <div class="form-group">
            <label for="itemSKU" class="col-sm-2 control-label">Item SKU</label>
            <div class="col-sm-4">
                <input class="form-control" ng-model="form.itemSKU" >
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
                <input class="form-control date"  type="datetime" ng-model="form.date" >
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


        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-success">Generate Refund Link</button>
            </div>
        </div>

    </form>

</div>





