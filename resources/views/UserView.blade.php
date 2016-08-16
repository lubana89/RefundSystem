

<div style="margin:2%">

			<button class="btn btn-primary" ng-click="user.ToSellerForm()">Fill Form</button>
			<button class="btn btn-success" ng-click="user.refresh()">Refresh Grid</button>
			<button class="btn btn-danger" ng-click="user.logout()">Logout</button>

</div>

<div class="table-responsive" >
	<table class="table table-bordered">
		<tr>
			<th>Customer EmailAddress</th>
			<th>Order Number</th>
			<th>Date</th>
			<th>Price</th>
			<th>Item SKU</th>
			<th>Reason</th>
			<th>Condition</th>
			<th>Wish</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		<tr ng-repeat="RefundCase in user.CasesGrid">
			<td>{{RefundCase.emailAddress}}</td>
			<td>{{RefundCase.orderNumber}}</td>
			<td>{{RefundCase.date}}</td>
			<td>{{RefundCase.price}}</td>
			<td>{{RefundCase.itemSKU}}</td>
			<td>{{RefundCase.reason}}</td>
			<td>{{RefundCase.condition}}</td>
			<td>{{RefundCase.wish}}</td>
			<td><button class="btn btn-primary btn-xs" ng-click="user.EditCase(RefundCase)" ><span class="glyphicon glyphicon-pencil"></span></button></td>
			<td><button class="btn btn-danger btn-xs" ng-click="user.DeleteCase(RefundCase.Id)" ><span class="glyphicon glyphicon-trash"></span></button></td>
		</tr>
	</table>
</div>
<div id="editDiv" hidden>
<form class="form-horizontal" role="form" style="margin-top:5%;" action="#">
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
			<button type="submit" class="btn btn-success" ng-click="user.SubmitEditedForm()">Update</button>
		</div>
	</div>

</form>
</div>