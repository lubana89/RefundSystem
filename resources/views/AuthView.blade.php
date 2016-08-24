
<div class="col-sm-4 col-sm-offset-4" style="margin-top:20%">
		<form novalidate name="AuthForm" ng-submit="AuthForm.$valid && auth.login()">
			<p class="alert alert-danger" ng-if="auth.loginError"><strong>Error:</strong> {{auth.loginErrorText}}</p>
			<div class="form-group">
		    	<input  name="email" class="form-control" placeholder="Email" ng-model="auth.email" ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" required>
				<span ng-show="AuthForm.email.$error.pattern">Not a valid mail!</span>
		  	</div>
		  	<div class="form-group">
		    	<input type="password" class="form-control" placeholder="Password" ng-model="auth.password">
		  	</div>
		  	<button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-log-in"></span></button>
		</form>

</div>