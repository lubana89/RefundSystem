
<div style="margin:2%">
    <button class="btn btn-success" ng-click="manageuser.Back();"><span class="glyphicon glyphicon-arrow-left"></span></button>
    <button class="btn btn-primary" ng-click="manageuser.refresh()"><span class="glyphicon glyphicon-refresh"></span></button>
    <button class="btn btn-primary" ng-click="manageuser.OpenAddUserForm()"><span class="glyphicon glyphicon-plus"></span>User</button>
    <button class="btn btn-danger" ng-click="manageuser.logout()"><span class="glyphicon glyphicon-log-out"></span></button>
</div>
<div style="margin-top:2%;margin-bottom: 2%;">

    <button class="btn btn-warning" ng-click="manageuser.CreateRole()"><span class="glyphicon glyphicon-plus"></span> Role</button>
    <button class="btn btn-warning" ng-click="manageuser.CreatePermission()"><span class="glyphicon glyphicon-plus"></span> Permission</button>
    <button class="btn btn-warning" ng-click="manageuser.AttachPermissionRole()"><span class="glyphicon glyphicon-link"></span> Role-Permission</button>

</div>
<div class="table-responsive" >
    <table class="table table-bordered">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Assign Role</th>
        </tr>
        <tr ng-repeat="User in manageuser.UserGrid" ng-if="User.id">
            <td>{{User.id}}</td>
            <td>{{User.name}}</td>
            <td>{{User.email}}</td>
            <td>{{User.roles[0].name}}</td>
            <td><button class="btn btn-primary btn-xs" ng-click="manageuser.EditUser(User)"><span class="glyphicon glyphicon-pencil"></span></button></td>
            <td ><button class="btn btn-danger btn-xs" ng-click="manageuser.DeleteUser(User.id)"><span class="glyphicon glyphicon-trash"></span></button></td>
            <td ><button class="btn btn-danger btn-xs" ng-click="manageuser.AttachRole(User)"><span class="glyphicon glyphicon-plus-sign"></span></button></td>
        </tr>
    </table>
</div>


<div id="editDiv" hidden>
    <form class="form-horizontal" role="form" style="margin-top:5%;" action="#">
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Name</label>
            <div class="col-sm-4">
                <input class="form-control" id="email"   ng-model="manageuser.EditFormData.name" >
            </div>
        </div>
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-4">
                <input class="form-control" id="email"   ng-model="manageuser.EditFormData.email" >
            </div>
        </div>
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-4">
                <input class="form-control" id="email"   ng-model="manageuser.EditFormData.password" >
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-success" ng-click="manageuser.SubmitEditedForm()">Update</button>
            </div>
        </div>
    </form>
</div>

<div id="addUserDiv" hidden>
    <form class="form-horizontal" role="form" style="margin-top:5%;" action="#">
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Name</label>
            <div class="col-sm-4">
                <input class="form-control" id="email"   ng-model="manageuser.EditFormData.name" >
            </div>
        </div>
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-4">
                <input class="form-control" id="email"   ng-model="manageuser.EditFormData.email" >
            </div>
        </div>
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-4">
                <input class="form-control" id="email"   ng-model="manageuser.EditFormData.password" >
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-success" ng-click="manageuser.SubmitNewUserForm()">Add</button>
            </div>
        </div>
    </form>
</div>