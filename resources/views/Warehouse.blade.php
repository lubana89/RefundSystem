<div data-ng-include="getGlobals('configuration_MenuPath')"></div>

<div style="margin:2%">

    <button class="btn btn-success"  ng-if="warehouse.Role=='Admin'" ng-click="warehouse.Back()"><span class="glyphicon glyphicon-arrow-left"> Back </span></button>
    <button class="btn btn-primary" ng-click="warehouse.refresh()"><span class="glyphicon glyphicon-refresh"> Refresh </span></button>
    <button class="btn btn-danger" style="float:right;margin-right:2%" ng-if="warehouse.Role!='Seller'" ng-click="warehouse.CreateNotification()"><span class="glyphicon glyphicon-bell"> Notify Seller</span></button>
    <button class="btn btn-info" id="notificationBtn" style="float:right;margin-right:2%"   ng-click="warehouse.ShowNotifications()"><i class="glyphicon glyphicon-bell"> </i><span class="button__badge" ng-if="warehouse.NotificationCount!=0">{{warehouse.NotificationCount}}</span></button>
</div>
<div style="margin:2%">
<button class="btn btn-warning" ng-click="warehouse.AllBufferCases(true)"><span>Buffer(F2)</span></button>
<button class="btn btn-warning" ng-click="warehouse.AllForecastCases(true)"><span>Forecast(F4)</span></button>
<button class="btn btn-warning" ng-click="warehouse.AllArchivedCases(true)"><span>Archived(F8)</span></button>
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

<div class="table-responsive" ng-if="warehouse.CasesGrid !=''">
    <table class="table table-bordered">
        <tr>
            <th>Case Id</th>
            <th>Add Image</th>
            <th>Case Images</th>
            <th>RefundCaseStatus</th>
            <th>RefundCaseStatusKey</th>
            <th>Update Status</th>
            <th>Edit Case</th>
            <th>Case Message</th>
            <th>Case Detail</th>
        </tr>
        <tr ng-repeat="RefundCase in warehouse.CasesGrid" ng-style="warehouse.GridStyle">
            <td>{{RefundCase.RefundCase_Id}}</td>
            <td><button class="btn btn-primary btn-xs" ng-click="warehouse.AddImage(RefundCase.RefundCase_Id)" ><span class="glyphicon glyphicon-plus"></span></button></td>
            <td><button class="btn btn-primary btn-xs" ng-click="warehouse.ShowImages(RefundCase.RefundCase_Id)" ><span class="glyphicon glyphicon-camera"></span></button></td>
            <td>{{RefundCase.RefundCaseStatus}}</td>
            <td>{{RefundCase.RefundCaseStatusKey}}</td>
            <td><button class="btn btn-primary btn-xs" ng-click="warehouse.UpdateStatusCase(RefundCase.RefundCase_Id)" ><span class="glyphicon glyphicon-pencil"></span></button></td>
            <td><button class="btn btn-primary btn-xs" ng-click="warehouse.EditCase(RefundCase)" ><span class="glyphicon glyphicon-pencil"></span></button></td>
            <td><button class="btn btn-primary btn-xs" ng-click="warehouse.AddComment(RefundCase)" ><span class="glyphicon glyphicon-pencil"></span></button></td>
            <td><button class="btn btn-primary btn-xs" ng-click="warehouse.WarehouseItem(RefundCase)" ><span class="glyphicon glyphicon-book"></span></button></td>
        </tr>
    </table>
</div>

<div id="editDiv" hidden>
    <form class="form-horizontal" name="ediForm" novalidate role="form" style="margin-top:5%;" ng-submit="ediForm.$valid && warehouse.SubmitEditedForm()" >
        <fieldset class="step">
            <legend>Sender:</legend>
            <div class="form-group">
                <label for="name" class="col-sm-5 control-label"> Name</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.name">
                </div>
            </div>
            <div class="form-group">
                <label for="email" class="col-sm-5 control-label"> Email</label>
                <div class="col-sm-7">
                    <input class="form-control" name="email" ng-model="warehouse.EditFormData.emailAddress"
                           ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/">
                    <span ng-show="ediForm.email.$error.pattern">Not a valid mail!</span>
                </div>
            </div>
            <div class="form-group">
                <label for="street" class="col-sm-5 control-label"> Street</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.street">
                </div>
            </div>
            <div class="form-group">
                <label for="plz" class="col-sm-5 control-label"> PLZ</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.plz">
                </div>
            </div>
            <div class="form-group">
                <label for="city" class="col-sm-5 control-label"> City</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.city">
                </div>
            </div>
            <div class="form-group">
                <label for="country" class="col-sm-5 control-label"> Country</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.country">
                </div>
            </div>
        </fieldset>
        <fieldset class="step">
            <legend>Order:</legend>
            <div class="form-group">
                <label for="orderId" class="col-sm-5 control-label">Order Number</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.orderNumber">
                </div>
            </div>
            <div class="form-group">
                <label for="date" class="col-sm-5 control-label">Date</label>
                <div class="col-sm-7">
                    <input class="form-control date" type="text" jqdatepicker ng-model="warehouse.EditFormData.date">
                </div>
            </div>
        </fieldset>
        <fieldset class="step">
            <legend>Bank:</legend>
            <div class="form-group">
                <label for="BankAccountHolderName" class="col-sm-5 control-label">Account Holder Name</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.bankAccountHolderName">
                </div>
            </div>
            <div class="form-group">
                <label for="IBAN" class="col-sm-5 control-label">IBAN</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.IBAN">
                </div>
            </div>
        </fieldset>
        <fieldset class="step">
            <legend>Item:</legend>
            <div class="form-group">
                <label for="itemSKU" class="col-sm-5 control-label">Item SKU</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.itemSKU">
                </div>
            </div>
            <div class="form-group">
                <label for="price" class="col-sm-5 control-label">Price</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="warehouse.EditFormData.price">
                </div>
            </div>
            <div class="form-group">
                <label for="reason" class="col-sm-5 control-label">Reason</label>
                <div class="col-sm-7">
                    <select ng-model="warehouse.EditFormData.reason" ng-options="x for x in warehouse.reasons">
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="itemCondition" class="col-sm-5 control-label">Item Condition</label>
                <div class="col-sm-7">
                    <select ng-model="warehouse.EditFormData.condition" ng-options="x for x in warehouse.conditions">
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="wish" class="col-sm-5 control-label">Wish</label>
                <div class="col-sm-7">
                    <select ng-model="warehouse.EditFormData.wish" ng-options="x for x in warehouse.wishes">
                    </select>
                </div>
            </div>

        </fieldset>
        <fieldset class="step">
            <legend>Update</legend>
            <div class="form-group">
                <div >
                    <button type="submit" class="btn btn-success">Update</button>
                </div>
            </div>
        </fieldset>
    </form>
</div>
<div id="messageDiv" class="panel panel-info" hidden>
    <div class="panel-body">
        <ul class="media-list" ng-repeat="message in warehouse.Messages">
            <message class="media" ></message>
        </ul>
    </div>
</div>