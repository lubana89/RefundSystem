

<div style="margin:2%">

    <button class="btn btn-success"  ng-if="warehouse.Role=='Admin'" ng-click="warehouse.Back()"><span class="glyphicon glyphicon-arrow-left"></span></button>
    <button class="btn btn-primary" ng-click="warehouse.refresh()"><span class="glyphicon glyphicon-refresh"></span></button>
    <button class="btn btn-danger" ng-click="warehouse.logout()"><span class="glyphicon glyphicon-log-out"></span></button>


</div>
<div class="container" style="margin-bottom: 2%">
    <div class="row">
        <div id="search-input">
            <div class="col-md-4">
                <input type="text"  class="search-query form-control" ng-model="warehouse.Search" placeholder="Search" />

            </div>
            <div class="col-md-4">
            <span class="input-group-btn">
                                    <button class="btn btn-danger" type="button"  ng-click="warehouse.SearchClick()">
                                        <span class=" glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
            </div>
        </div>
    </div>
</div>
<div id="DetailDiv" hidden style="margin-bottom: 2%">

    <div class="detail" >
        <label >Customer Email :-</label>
        <label> {{ warehouse.EditFormData.emailAddress}} </label>

    </div>

    <div class="detail" >
        <label >Order Number :-</label>
        <label> {{ warehouse.EditFormData.orderNumber}} </label>
    </div>
    <div class="detail" >
        <label>Item SKU :-</label>
        <label> {{ warehouse.EditFormData.itemSKU}} </label>

    </div>
    <div class="detail" >
        <label>Price :-</label>
        <label> {{ warehouse.EditFormData.price}} </label>
    </div>
    <div class="detail" >
        <label >Date :-</label>
        <label> {{ warehouse.EditFormData.date}} </label>

    </div>
    <div class="detail">
        <label>Reason :-</label>
        <label> {{ warehouse.EditFormData.reason}} </label>
    </div>
    <div class="detail">
        <label >Item Condition :-</label>
        <label> {{ warehouse.EditFormData.condition}} </label>
    </div>
    <div class="detail">
        <label >Wish :-</label>
        <label> {{ warehouse.EditFormData.wish}} </label>
    </div>

</div>
<div class="table-responsive" >
    <table class="table table-bordered">
        <tr>
            <th>Case Id</th>
            <th>RefundCaseStatus</th>
            <th>Update Status</th>
            <th>Edit Case</th>
        </tr>
        <tr ng-repeat="RefundCase in warehouse.CasesGrid">
            <td>{{RefundCase.RefundCase_Id}}</td>
            <td>{{RefundCase.RefundCaseStatus}}</td>

            <td><button class="btn btn-primary btn-xs" ng-click="warehouse.UpdateStatusCase(RefundCase.RefundCase_Id)" ><span class="glyphicon glyphicon-pencil"></span></button></td>
            <td><button class="btn btn-primary btn-xs" ng-click="warehouse.EditCase(RefundCase)" ><span class="glyphicon glyphicon-pencil"></span></button></td>
        </tr>
    </table>
</div>

<div id="editDiv" hidden>
    <form class="form-horizontal" role="form" style="margin-top:5%;" action="#">
        <div class="form-group" >
            <label for="email" class="col-sm-2 control-label">Customer Email</label>
            <div class="col-sm-4">
                <input class="form-control" id="email"   ng-model="warehouse.EditFormData.emailAddress" >
            </div>

        </div>

        <div class="form-group" >
            <label for="orderId" class="col-sm-2 control-label">Order Number</label>
            <div class="col-sm-4">
                <input class="form-control" id="orderId" ng-model="warehouse.EditFormData.orderNumber" >
            </div>

        </div>
        <div class="form-group" >
            <label for="itemSKU" class="col-sm-2 control-label">Item SKU</label>
            <div class="col-sm-4">
                <input class="form-control" id="itemSKU" ng-model="warehouse.EditFormData.itemSKU" >
            </div>

        </div>
        <div class="form-group" >
            <label for="price" class="col-sm-2 control-label">Price</label>
            <div class="col-sm-4">
                <input class="form-control" id="price" ng-model="warehouse.EditFormData.price" >
            </div>

        </div>
        <div class="form-group" >
            <label for="date" class="col-sm-2 control-label">Date</label>
            <div class="col-sm-4">
                <input class="form-control date" id="date" type="datetime" ng-model="warehouse.EditFormData.date" >
            </div>

        </div>
        <div class="form-group">
            <label for="reason" class="col-sm-2 control-label">Reason</label>
            <div class="col-sm-4">
                <select ng-model="warehouse.EditFormData.reason" ng-options="x for x in warehouse.reasons">
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="itemCondition" class="col-sm-2 control-label">Item Condition</label>
            <div class="col-sm-4">
                <select ng-model="warehouse.EditFormData.condition" ng-options="x for x in warehouse.conditions">
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="wish" class="col-sm-2 control-label">Wish</label>
            <div class="col-sm-4">
                <select ng-model="warehouse.EditFormData.wish" ng-options="x for x in warehouse.wishes">
                </select>
            </div>
        </div>


        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-success" ng-click="warehouse.SubmitEditedForm()">Update</button>
            </div>
        </div>

    </form>
</div>