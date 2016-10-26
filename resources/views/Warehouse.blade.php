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
    <form class="form-horizontal" role="form" style="margin-top:5%;" action="#">
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
<div id="messageDiv" class="panel panel-info" hidden>
    <div class="panel-body">
        <ul class="media-list" ng-repeat="message in warehouse.Messages">
            <message class="media" ></message>
        </ul>
    </div>
</div>