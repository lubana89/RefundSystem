
<div class="col-sm-4 col-sm-offset-4" style="margin-top:20%">
		<form>
			<p class="alert alert-danger" ng-if="auth.loginError"><strong>Error:</strong> {{auth.loginErrorText}}</p>
			<div class="form-group">
		    	<input type="email" class="form-control" placeholder="Email" ng-model="auth.email">
		  	</div>
		  	<div class="form-group">
		    	<input type="password" class="form-control" placeholder="Password" ng-model="auth.password">
		  	</div>
		  	<button class="btn btn-primary" ng-click="auth.login()"><span class="glyphicon glyphicon-log-in"></span></button>
		</form>

</div>