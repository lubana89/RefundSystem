
<div data-ng-include="getGlobals('configuration_MenuPath')"></div>
<div style="margin:2%">
			<button class="btn btn-primary" ng-click="user.refresh()"><span class="glyphicon glyphicon-refresh"> Refresh </span></button>
			<button class="btn btn-danger" style="float:right;margin-right:2%" ng-if="user.Role=='Seller'" ng-click="user.CreateNotification()"><span class="glyphicon glyphicon-bell"> Notify Admin</span></button>
			<button class="btn btn-info" id="notificationBtn" style="float:right;margin-right:2%"   ng-click="user.ShowNotifications()"><i class="glyphicon glyphicon-bell"> </i><span class="button__badge" ng-if="user.NotificationCount!=0">{{user.NotificationCount}}</span></button>

</div>

<div class="table-responsive" >
	<table class="table table-bordered">
		<tr>

			<th>Case Id</th>
			<th>Add Image</th>
			<th>Case Images</th>
			<th>Customer Email Address</th>
			<th>Order Number</th>
			<th>Date</th>
			<th>Price</th>
			<th>Item SKU</th>
			<th>Reason</th>
			<th>Condition</th>
			<th>Wish</th>
			<th>Case Message</th>
			<th>Edit</th>
			<th>Delete</th>
			<th>Link</th>
			<th>Email-ME-Link</th>
		</tr>
		<tr ng-repeat="RefundCase in user.CasesGrid">

			<td>{{RefundCase.Id}}</td>
			<td><button class="btn btn-primary btn-xs" ng-click="user.AddImage(RefundCase.Id)" ><span class="glyphicon glyphicon-plus"></span></button></td>
			<td><button class="btn btn-primary btn-xs" ng-click="user.ShowImages(RefundCase.Id)" ><span class="glyphicon glyphicon-camera"></span></button></td>
			<td>{{RefundCase.emailAddress}}</td>
			<td>{{RefundCase.orderNumber}}</td>
			<td>{{RefundCase.date}}</td>
			<td>{{RefundCase.price}}</td>
			<td>{{RefundCase.itemSKU}}</td>
			<td>{{RefundCase.reason}}</td>
			<td>{{RefundCase.condition}}</td>
			<td>{{RefundCase.wish}}</td>
			<td><button class="btn btn-primary btn-xs" ng-click="user.ShowMessages(RefundCase.Id)" ><span class="glyphicon glyphicon-list"></span></button></td>
			<td ng-if="RefundCase.IsLabelGenerated == false"><button class="btn btn-primary btn-xs" ng-click="user.EditCase(RefundCase)" ><span class="glyphicon glyphicon-pencil"></span></button></td>
			<td ng-if="RefundCase.IsLabelGenerated == false"><button class="btn btn-danger btn-xs" ng-click="user.DeleteCase(RefundCase.Id)" ><span class="glyphicon glyphicon-trash"></span></button></td>
			<td ng-if="RefundCase.IsLabelGenerated == false"><button class="btn btn-danger btn-xs" ng-click="user.GetLink(RefundCase.Id)" ><span class="glyphicon glyphicon-link"></span></button></td>
			<td ng-if="RefundCase.IsLabelGenerated == false"><button class="btn btn-danger btn-xs" ng-click="user.MailLink(RefundCase.Id)" ><span class="glyphicon glyphicon-envelope"></span></button></td>
		</tr>
	</table>
</div>
<div id="editDiv" hidden>
	<form class="form-horizontal" name="ediForm" novalidate role="form" style="margin-top:5%;" ng-submit="ediForm.$valid && user.SubmitEditedForm()" >
        <fieldset class="step">
            <legend>Sender:</legend>
            <div class="form-group">
                <label for="name" class="col-sm-5 control-label"> Name</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.name">
                </div>
            </div>
            <div class="form-group">
                <label for="email" class="col-sm-5 control-label"> Email</label>
                <div class="col-sm-7">
                    <input class="form-control" name="email" ng-model="user.EditFormData.emailAddress"
                           ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/">
                    <span ng-show="SellerForm.email.$error.pattern">Not a valid mail!</span>
                </div>
            </div>
            <div class="form-group">
                <label for="street" class="col-sm-5 control-label"> Street</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.street">
                </div>
            </div>
            <div class="form-group">
                <label for="plz" class="col-sm-5 control-label"> PLZ</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.plz">
                </div>
            </div>
            <div class="form-group">
                <label for="city" class="col-sm-5 control-label"> City</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.city">
                </div>
            </div>
            <div class="form-group">
                <label for="country" class="col-sm-5 control-label"> Country</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.country">
                </div>
            </div>
        </fieldset>
        <fieldset class="step">
            <legend>Order:</legend>
            <div class="form-group">
                <label for="orderId" class="col-sm-5 control-label">Order Number</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.orderNumber">
                </div>
            </div>
            <div class="form-group">
                <label for="date" class="col-sm-5 control-label">Date</label>
                <div class="col-sm-7">
                    <input class="form-control date" type="text" jqdatepicker ng-model="user.EditFormData.date">
                </div>
            </div>
        </fieldset>
        <fieldset class="step">
            <legend>Bank:</legend>
            <div class="form-group">
                <label for="BankAccountHolderName" class="col-sm-5 control-label">Account Holder Name</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.bankAccountHolderName">
                </div>
            </div>
            <div class="form-group">
                <label for="IBAN" class="col-sm-5 control-label">IBAN</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.IBAN">
                </div>
            </div>
        </fieldset>
        <fieldset class="step">
            <legend>Item:</legend>
            <div class="form-group">
                <label for="itemSKU" class="col-sm-5 control-label">Item SKU</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.itemSKU">
                </div>
            </div>
            <div class="form-group">
                <label for="price" class="col-sm-5 control-label">Price</label>
                <div class="col-sm-7">
                    <input class="form-control" ng-model="user.EditFormData.price">
                </div>
            </div>
            <div class="form-group">
                <label for="reason" class="col-sm-5 control-label">Reason</label>
                <div class="col-sm-7">
                    <select ng-model="user.EditFormData.reason" ng-options="x for x in user.reasons">
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="itemCondition" class="col-sm-5 control-label">Item Condition</label>
                <div class="col-sm-7">
                    <select ng-model="user.EditFormData.condition" ng-options="x for x in user.conditions">
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="wish" class="col-sm-5 control-label">Wish</label>
                <div class="col-sm-7">
                    <select ng-model="user.EditFormData.wish" ng-options="x for x in user.wishes">
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
	<ul class="media-list" ng-repeat="message in user.Messages">
		<message class="media" ></message>
	</ul>
</div>
</div>
