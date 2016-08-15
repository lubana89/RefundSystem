

<div >
		<div class="btn-group" style="margin:2%">
			<button class="btn btn-primary" ng-click="user.ToSellerForm()">Fill Form</button>
			<button class="btn btn-danger" ng-click="user.logout()">Logout</button>
		</div>


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
		</tr>
	</table>
</div>