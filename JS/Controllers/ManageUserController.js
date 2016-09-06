(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('ManageUserCtrl',['$http', '$auth', '$rootScope', '$state', ManageUserCtrl]);

    function ManageUserCtrl($http, $auth, $rootScope, $state) {
        if(user && getCookie('Role') !=null) {
            var vm = this;
            vm.refresh = function() {
                vm.UserGrid = [];
                vm.EditFormData='';
                $http.get(configuration.path + '/api/Users?token=' + $auth.getToken()).success(function (data) {
                    jQuery.each(data.users, function(i, val) {
                        if(val.id == user.id){
                            delete data.users[i];
                        }
                    });
                    vm.UserGrid=data.users;

                });
            };
            vm.refresh();
            // user edit dialog
            vm.EditUser=function (Data) {
                vm.EditFormData=Data;
                var editBox=$('#editDiv');
                editBox.dialog({width:700,close:vm.refresh});
                editBox.dialog('open');
            };
            //submit edited data of user
            vm.SubmitEditedForm=function () {
                 var editBox=$('#editDiv');
                 editBox.dialog('destroy');
                $http.post(configuration.path+'/api/UpdateUser?token=' + $auth.getToken(), JSON.stringify(vm.EditFormData)).success(function(data){
                    vm.refresh();
                });
            };
            // create new user dialog
            vm.OpenAddUserForm=function () {
                var UserBox=$('#addUserDiv');
                UserBox.dialog({width:700,close:vm.refresh});
                UserBox.dialog('open');
            };
            //create new user
            vm.SubmitNewUserForm=function () {
                 var UserBox=$('#addUserDiv');
                UserBox.remove();
                 $http.post(configuration.path+'/api/CreateUser?token=' + $auth.getToken(), JSON.stringify(vm.EditFormData)).success(function(data){
                     vm.refresh();
                 });
            };
            //Assign role to user dialog
            vm.AttachRole=function (userData) {
                $http.get(configuration.path + '/api/Roles?token=' + $auth.getToken()).success(function (data) {
                    var combo = $("<select class='form-control' id='asnRoleSelect'></select>");

                    $.each(data, function (i, el) {
                        combo.append("<option id="+ el.id +">" + el.name + "</option>");
                    });
                    var btn=$('<input/>').attr({
                        type: "button",
                        value:"Attach Role",
                        style:'margin-top:2%',
                        class:'btn btn-danger attachRole'
                    });
                    $(document).off('click').on('click', '.attachRole', function(){

                        vm.AssignRole(userData);
                    });
                    $('<div  id="asnRole"/>').html(combo).append(btn).dialog({width:700,title: 'Select Role For User'});
                });
            };
            //assign role
            vm.AssignRole=function (userData) {
                userData.role=$('#asnRoleSelect').children(":selected").attr("id");
                $('#asnRole').remove();
                $http.post(configuration.path+'/api/AssignRole?token=' + $auth.getToken(), JSON.stringify(userData)).success(function(data){
                    vm.refresh();
                });

            };
            //delete user
            vm.DeleteUser=function (id) {
                $http.get(configuration.path + '/api/DeleteUser/'+id+'?token=' + $auth.getToken()).success(function (data) {
                    vm.refresh();
                });
            };
            //create new role
            vm.CreateRole=function () {
                alert('This Feature is under construction');
            };
            //create new permission
            vm.CreatePermission=function () {
                alert('This Feature is under construction');
            };
            //attach permission to role
            vm.AttachPermissionRole=function () {
                alert('This Feature is under construction');
            };
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
            vm.Back = function () {
                Back($state);
            }
        }
        else
            Logout($auth, $rootScope, $state);
    }
})();