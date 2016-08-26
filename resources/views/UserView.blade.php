

<div style="margin:2%">

			<button class="btn btn-primary" ng-click="user.ToSellerForm()"><span class="glyphicon glyphicon-edit"> Fill Form </span></button>
			<button class="btn btn-primary" ng-click="user.refresh()"><span class="glyphicon glyphicon-refresh"> Refresh </span></button>
			<button class="btn btn-primary"  ng-if="user.Role=='Admin'" ng-click="user.ToUserGrid()"><span class="glyphicon glyphicon-user"> Manage User</span></button>
			<button class="btn btn-primary"  ng-if="user.Role=='Admin'" ng-click="user.ToWarehouseGrid()"><span class="glyphicon glyphicon-briefcase"> Warehouse </span></button>
			<button class="btn btn-danger" ng-click="user.logout()"><span class="glyphicon glyphicon-log-out"> Sign Out</span></button>
			<button class="btn btn-info" id="notificationBtn" style="float:right;margin-right:2%" ng-if="user.Role=='Seller'"  ng-click="user.ShowNotifications()"><i class="glyphicon glyphicon-bell"> </i><span class="button__badge" ng-if="user.NotificationCount!=0">{{user.NotificationCount}}</span></button>

</div>

<div class="table-responsive" >
	<table class="table table-bordered">
		<tr>
			<th>Case Id</th>
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
			<th>Links</th>

		</tr>
		<tr ng-repeat="RefundCase in user.CasesGrid">
			<td>{{RefundCase.Id}}</td>
			<td>{{RefundCase.emailAddress}}</td>
			<td>{{RefundCase.orderNumber}}</td>
			<td>{{RefundCase.date}}</td>
			<td>{{RefundCase.price}}</td>
			<td>{{RefundCase.itemSKU}}</td>
			<td>{{RefundCase.reason}}</td>
			<td>{{RefundCase.condition}}</td>
			<td>{{RefundCase.wish}}</td>
			<td><button class="btn btn-primary btn-xs" ng-click="user.ShowMessages(RefundCase.Id)" ><span class="glyphicon glyphicon-list"></span></button></td>
			<td><button class="btn btn-primary btn-xs" ng-click="user.EditCase(RefundCase)" ><span class="glyphicon glyphicon-pencil"></span></button></td>
			<td ng-if="RefundCase.IsLabelGenerated == false"><button class="btn btn-danger btn-xs" ng-click="user.DeleteCase(RefundCase.Id)" ><span class="glyphicon glyphicon-trash"></span></button></td>
			<td ng-if="RefundCase.IsLabelGenerated == false"><button class="btn btn-danger btn-xs" ng-click="user.GetLink(RefundCase.Id)" ><span class="glyphicon glyphicon-link"></span></button></td>

		</tr>
	</table>
</div>
<div id="editDiv" hidden>
	<form class="form-horizontal" name="ediForm" novalidate role="form" style="margin-top:5%;" ng-submit="ediForm.$valid && user.SubmitEditedForm()" >
	<div class="form-group" ng-if="user.EditFormData.IsLabelGenerated == false">
		<label for="email" class="col-sm-2 control-label">Customer Email</label>
		<div class="col-sm-4">
			<input class="form-control" name="email"   ng-model="user.EditFormData.emailAddress" ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/">
			<span ng-show="ediForm.email.$error.pattern">Not a valid mail!</span>
		</div>

	</div>

	<div class="form-group" ng-if="user.EditFormData.IsLabelGenerated == false">
		<label for="orderId" class="col-sm-2 control-label">Order Number</label>
		<div class="col-sm-4">
			<input class="form-control"  ng-model="user.EditFormData.orderNumber" >
		</div>

	</div>
	<div class="form-group" ng-if="user.EditFormData.IsLabelGenerated == false">
		<label for="itemSKU" class="col-sm-2 control-label">Item SKU</label>
		<div class="col-sm-4">
			<input class="form-control"  ng-model="user.EditFormData.itemSKU" >
		</div>

	</div>
	<div class="form-group" ng-if="user.EditFormData.IsLabelGenerated == false">
		<label for="price" class="col-sm-2 control-label">Price</label>
		<div class="col-sm-4">
			<input class="form-control" ng-model="user.EditFormData.price" >
		</div>

	</div>
	<div class="form-group" ng-if="user.EditFormData.IsLabelGenerated == false">
		<label for="date" class="col-sm-2 control-label">Date</label>
		<div class="col-sm-4">
			<input class="form-control date"  type="datetime" ng-model="user.EditFormData.date" >
		</div>

	</div>
	<div class="form-group">
		<label for="reason" class="col-sm-2 control-label">Reason</label>
		<div class="col-sm-4">
			<select ng-model="user.EditFormData.reason" ng-options="x for x in user.reasons">
			</select>
		</div>
	</div>
	<div class="form-group">
		<label for="itemCondition" class="col-sm-2 control-label">Item Condition</label>
		<div class="col-sm-4">
			<select ng-model="user.EditFormData.condition" ng-options="x for x in user.conditions">
			</select>
		</div>
	</div>
	<div class="form-group">
		<label for="wish" class="col-sm-2 control-label">Wish</label>
		<div class="col-sm-4">
			<select ng-model="user.EditFormData.wish" ng-options="x for x in user.wishes">
			</select>
		</div>
	</div>


	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-10">
			<button type="submit" class="btn btn-success">Update</button>
		</div>
	</div>

</form>
</div>
<div id="messageDiv" class="panel panel-info" hidden>
	<div class="panel-body">
	<ul class="media-list" ng-repeat="message in user.Messages">
		<message class="media" ></message>
	</ul>
</div>
</div>