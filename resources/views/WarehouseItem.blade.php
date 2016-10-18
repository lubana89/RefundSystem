<div data-ng-include="getGlobals('configuration_MenuPath')"></div>
<div style="margin:2%">
    <button class="btn btn-success" ng-click="warehouseitem.BackToWarehouse();"><span
                class="glyphicon glyphicon-arrow-left"> Back </span></button>
</div>
<div style="margin:2%">
    <button class="btn btn-warning" disabled><span>Pass(F1)</span></button>
    <button class="btn btn-warning" disabled><span>Hold(F2)</span></button>
    <button class="btn btn-warning" disabled><span>Reject(F3)</span></button>
    <button class="btn btn-warning"  disabled><span>Update Status|Action(F4)</span></button>
</div>
<div class="table-responsive" ng-if="warehouseitem.CaseDetails !=''">
<div class="warehouseitem_id">
    <span ng-bind="warehouseitem.CaseID"></span>
</div>
<div class="warehouseitem_caseinfo">
    <span style="color:green"><b>Case Info:</b></span></br>
    <b>seller: </b> <span ng-bind="warehouseitem.CaseDetails.sellerNumber"></span></br>
    <b>order number:</b> <span ng-bind="warehouseitem.CaseDetails.orderNumber"></span></br>
    <b>date: </b> <span ng-bind="warehouseitem.CaseDetails.date"></span></br>

</div>
<div class="warehouseitem_client">
    <span style="color:green"><b>Client Info:</b></span></br>
    <b>EmailAddress:</b> <span ng-bind="warehouseitem.CaseDetails.emailAddress"></span></br>
    <b> Name:</b> <span ng-bind="warehouseitem.CaseDetails.name"></span></br>
    <b> Street:</b> <span ng-bind="warehouseitem.CaseDetails.street"></span></br>
    <b>PLZ:</b> <span ng-bind="warehouseitem.CaseDetails.plz"></span></br>
    <b>City:</b> <span ng-bind="warehouseitem.CaseDetails.city"></span></br>
    <b> Country:</b> <span ng-bind="warehouseitem.CaseDetails.country"></span></br>
    <b>BankHolder-Name:</b> <span ng-bind="warehouseitem.CaseDetails.bankAccountHolderName"></span></br>
    <b>IBAN: </b><span ng-bind="warehouseitem.CaseDetails.IBAN"></span></br>
</div>

    <table class="table table-bordered" style="margin-top:5%">
        <tr>
            <th>SKU</th>
            <th>Condition</th>
            <th>Reason</th>
            <th>Wish</th>
            <th>Status|Action</th>
        </tr>
        <tr>
            <td>{{warehouseitem.CaseDetails.itemSKU}}</td>
            <td>{{warehouseitem.CaseDetails.condition}}</td>
            <td>{{warehouseitem.CaseDetails.reason}}</td>
            <td>{{warehouseitem.CaseDetails.wish}}</td>
            <td>{{warehouseitem.CaseDetails.warehouse_status_action}}</td>
        </tr>
    </table>
</div>
<div>
    <span style="color:green"><b>Case History:</b></span></br>
<div ng-repeat="historylog in warehouseitem.history.slice().reverse()" style="border: 1px solid;width: 55%">
    <span>{{historylog.Time}} | {{historylog.HistoryLog}}</span></br>
</div>
</div>