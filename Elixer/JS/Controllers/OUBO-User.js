
(function() {

    'use strict';

    angular
        .module('RefundSystemApp', ['ui.router', 'satellizer'])
        .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide,$locationProvider) {

            function redirectWhenLoggedOut($q, $injector) {

                return {
                    responseError: function(rejection) {
                        var $state = $injector.get('$state');
                        var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
                        angular.forEach(rejectionReasons, function(value, key) {
                            if(rejection.data.error === value) {
                                localStorage.removeItem('user');
                                $state.go('auth');
                            }
                        });
                        return $q.reject(rejection);
                    }
                }
            }


            $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
            $httpProvider.interceptors.push('redirectWhenLoggedOut');
            $authProvider.loginUrl = configuration.path+'/api/authenticate';
            $urlRouterProvider.otherwise('/auth');
            $stateProvider
                .state('auth', {
                    url:'/auth',
                    templateUrl: '../resources/views/AuthView.blade.php',
                    controller: 'AuthController as auth'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: '../resources/views/UserView.blade.php',
                    controller: 'UserController as user'
                })
                .state('sellerrefundform', {
                    url: '/sellerrefundform',
                    templateUrl: '../resources/views/SellerRefundForm.blade.php',
                    controller: 'SellerRefundFormCtrl as sellerrefundform'
                })
                .state('manageuser', {
                    url: '/manageuser',
                    templateUrl: '../resources/views/ManageUser.blade.php',
                    controller: 'ManageUserCtrl as manageuser'
                })
                .state('warehouse', {
                    url: '/warehouse',
                    templateUrl: '../resources/views/Warehouse.blade.php',
                    controller: 'WarehouseCtrl as warehouse'
                });
        })
        .run(function($rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
                 user = JSON.parse(localStorage.getItem('user'));
                if(user) {
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = user;
                    if(toState.name === "auth") {
                        event.preventDefault();
                        console.log(fromState.name);
                        if(fromState.name === "")
                            $state.go('users');
                    }
                }
            });
        });
})();
(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('AuthController', AuthController);


    function AuthController($auth, $state, $http, $rootScope) {

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText;

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            $auth.login(credentials).then(function() {

                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chain
                return $http.get(configuration.path+'/api/authenticate/user?token='+$auth.getToken()).then(function(response) {


                    // Stringify the returned data to prepare it
                    // to go into local storage
                    var user = JSON.stringify(response.data.user);


                    // Set the stringified user data into local storage
                    localStorage.setItem('user', user);

                    // The user's authenticated state gets flipped to
                    // true so we can now show parts of the UI that rely
                    // on the user being logged in
                    $rootScope.authenticated = true;

                    // Putting the user's data on $rootScope allows
                    // us to access it anywhere across the app
                    $rootScope.currentUser = response.data.user;

                    // Everything worked out so we can now redirect to
                    // the users state to view the data
                    $http.get(configuration.path+'/api/GetRole?token='+$auth.getToken()).success(function (data) {
                        createCookie('Role',data);
                        if(data != 'Warehouse')
                        $state.go('users');
                        else if(data == 'Warehouse')
                            $state.go('warehouse');
                    });


                });

                // Handle errors
            }, function(error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;
            });
        }

    }

})();
(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('UserController', UserController);

    function UserController($http, $auth, $rootScope, $state) {
        if(user) {

            var vm = this;
            vm.CasesGrid = [];
            vm.reasons = [];
            vm.wishes = [];
            vm.conditions = [];
            vm.Role=getCookie('Role');
            vm.refresh = function() {
                vm.CasesGrid = [];
                $http.get(configuration.path + '/Seller/AllCases/' + user.id + '?token=' + $auth.getToken()).success(function (data) {
                    $.each(data, function (index) {
                        var detail = JSON.parse(data[index].RefundCaseDetail);
                        var id = JSON.parse(data[index].RefundCase_Id);
                        detail.Id = id;
                        detail.IsLabelGenerated=data[index].RefundCaseStatusKey==""?false:true;
                        vm.CasesGrid.push(detail);
                    });

                });
            };
            vm.refresh();
            $http.get(configuration.path+'/wish').success(function(data){
                $.each(data, function(index) {
                    vm.wishes.push(data[index].Wish);
                });
            });
            $http.get(configuration.path+'/reason').success(function(data){
                $.each(data, function(index) {
                    vm.reasons.push(data[index].Reason);
                });
            });
            $http.get(configuration.path+'/itemCondition').success(function(data){
                $.each(data, function(index) {
                    vm.conditions.push(data[index].ItemCondition);
                });
            });
            vm.ToSellerForm = function () {
                if ($rootScope.authenticated)
                    $state.go('sellerrefundform');
                else
                    vm.logout();
            };
            vm.ToUserGrid=function () {
                if ($rootScope.authenticated && vm.Role=="Admin")
                    $state.go('manageuser');
                else
                    vm.logout();
            };
            vm.ToWarehouseGrid=function () {
                if ($rootScope.authenticated && vm.Role=="Admin")
                    $state.go('warehouse');
                else
                    vm.logout();
            };
            vm.EditCase=function (Data) {
                vm.EditFormData='';
                vm.EditFormData=Data;

                var editBox=$('#editDiv');
                editBox.dialog({width:700,close:vm.refresh});
                editBox.dialog('open');
            };
            vm.SubmitEditedForm=function () {
                var id=vm.EditFormData.Id;
                /*Delete unwanted properties*/
                delete vm.EditFormData.Id;
                delete vm.EditFormData.IsLabelGenerated;

                var editBox=$('#editDiv');
                editBox.dialog('destroy');
                $http.post(configuration.path+'/Seller/UpdateCaseData/'+id+ '?token=' + $auth.getToken(), JSON.stringify(vm.EditFormData)).success(function(data){
                    vm.refresh();
                });
            };
            vm.GetLink=function (id) {
                $http.get(configuration.path + '/Seller/GetLink/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    $('<div />').html(data).dialog({
                        title: 'Copy & Send To Customer', width: $(window).width() - 20,
                        height: 200
                    });
                });
            };
            vm.DeleteCase=function (id) {
                $http.get(configuration.path + '/Seller/DeleteCase/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    vm.refresh();
                });
            };
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
        }
        else
            Logout($auth, $rootScope, $state);
    }
})();
(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('SellerRefundFormCtrl',function ($scope, $http,$auth,$rootScope,$state) {
            if(user) {
            $scope.reasons = [];
            $scope.wishes = [];
            $scope.conditions = [];

            $http.get(configuration.path + '/wish').success(function (data) {
                $.each(data, function (index) {
                    $scope.wishes.push(data[index].Wish);
                });


            });
            $http.get(configuration.path + '/reason').success(function (data) {
                $.each(data, function (index) {
                    $scope.reasons.push(data[index].Reason);
                });


            });
            $http.get(configuration.path + '/itemCondition').success(function (data) {
                $.each(data, function (index) {
                    $scope.conditions.push(data[index].ItemCondition);
                });


            });
            $scope.form = {
                sellerNumber: user.id,
                emailAddress: "",
                orderNumber: "",
                date: "",
                price: "",
                itemSKU: "",
                reason: "",
                condition: "",
                wish: ""
            };
            $scope.logout = function () {
                Logout($auth, $rootScope, $state);
            }
            $scope.Back = function () {
                   Back($state);
            }
            $scope.SubmitForm = function () {
                if ($scope.form.sellerNumber != "") {
                    $http.post(configuration.path + '/Seller/GenerateRefundLink?token=' + $auth.getToken(), JSON.stringify($scope.form)).success(function (data) {

                        $('<div />').html(data).dialog({
                            title: 'Copy & Send To Customer', width: $(window).width() - 20,
                            height: 200
                        });
                    });
                }
            };
        }else{
                Logout($auth, $rootScope, $state);
            }
});
})();

(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('ManageUserCtrl', ManageUserCtrl);

    function ManageUserCtrl($http, $auth, $rootScope, $state) {
        if(user) {
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
            vm.EditUser=function (Data) {
                vm.EditFormData=Data;
                var editBox=$('#editDiv');
                editBox.dialog({width:700,close:vm.refresh});
                editBox.dialog('open');
            };
            vm.SubmitEditedForm=function () {
                 var editBox=$('#editDiv');
                 editBox.dialog('destroy');
                $http.post(configuration.path+'/api/UpdateUser?token=' + $auth.getToken(), JSON.stringify(vm.EditFormData)).success(function(data){
                    vm.refresh();
                });
            };
            vm.OpenAddUserForm=function () {
                var UserBox=$('#addUserDiv');
                UserBox.dialog({width:700,close:vm.refresh});
                UserBox.dialog('open');
            };
            vm.SubmitNewUserForm=function () {
                 var UserBox=$('#addUserDiv');
                UserBox.remove();
                 $http.post(configuration.path+'/api/CreateUser?token=' + $auth.getToken(), JSON.stringify(vm.EditFormData)).success(function(data){
                     vm.refresh();
                 });
            };
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
            vm.AssignRole=function (userData) {
                userData.role=$('#asnRoleSelect').children(":selected").attr("id");
                $('#asnRole').remove();
                $http.post(configuration.path+'/api/AssignRole?token=' + $auth.getToken(), JSON.stringify(userData)).success(function(data){
                    vm.refresh();
                });

            }
            vm.DeleteUser=function (id) {
                $http.get(configuration.path + '/api/DeleteUser/'+id+'?token=' + $auth.getToken()).success(function (data) {
                    vm.refresh();
                });
            };
            vm.CreateRole=function () {
                alert('This Feature is under construction');
            };
            vm.CreatePermission=function () {
                alert('This Feature is under construction');
            };
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
(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('WarehouseCtrl', WarehouseCtrl);

    function WarehouseCtrl($http, $auth, $rootScope, $state) {
        if(user) {

            var vm = this;
            vm.CasesGrid = [];
            vm.reasons = [];
            vm.wishes = [];
            vm.conditions = [];
            vm.Search='';
            vm.Role=getCookie('Role');
            vm.StatusDropDownData={
                "1":'Label Generated',
                "2": 'Item Recieved at Warehouse',
                "3":'Item Checked-Status(Dismatch)',
                "4":'Item Checked-case in process',
                "5":'refund/close case'
            };
            vm.SearchClick=function () {
                vm.CasesGrid = [];
                vm.EditFormData='';
                $http.get(configuration.path + '/Warehouse/ReturnedCase/'+ vm.Search +'?token=' + $auth.getToken()).success(function (data) {
                    $('#DetailDiv').hide();
                        if(data.length >0){
                            vm.Search='';
                            vm.CasesGrid.push(data[0]);
                            var detail= JSON.parse(data[0].RefundCaseDetail);
                            vm.EditFormData=detail;
                            $('#DetailDiv').show();
                            }
                        else {
                            alert('Case Id Not Found');
                        }
                });
            };
            vm.refresh = function() {
                $('#DetailDiv').hide();
                vm.CasesGrid = [];
                vm.EditFormData='';
                $http.get(configuration.path + '/Warehouse/AllReturnedCases?token=' + $auth.getToken()).success(function (data) {
                    if(data.length >0){
                    $.each(data, function (index) {
                       vm.CasesGrid.push(data[index]);
                    });
                    }
                });
            };
            vm.refresh();
            $http.get(configuration.path+'/wish').success(function(data){
                $.each(data, function(index) {
                    vm.wishes.push(data[index].Wish);
                });
            });
            $http.get(configuration.path+'/reason').success(function(data){
                $.each(data, function(index) {
                    vm.reasons.push(data[index].Reason);
                });
            });
            $http.get(configuration.path+'/itemCondition').success(function(data){
                $.each(data, function(index) {
                    vm.conditions.push(data[index].ItemCondition);
                });
            });
            vm.Back=function () {
                Back($state);
            };
            vm.UpdateStatusCase=function (caseID) {
                    var combo = $("<select class='form-control' id='updateCaseStatus'></select>");
                    $.each(vm.StatusDropDownData, function (i, el) {
                        combo.append("<option id="+ i +">" + el + "</option>");
                    });
                    var btn=$('<input/>').attr({
                        type: "button",
                        value:"Submit",
                        style:'margin-top:2%',
                        class:'btn btn-danger updateCaseStatus'
                    });
                    $(document).off('click').on('click', '.updateCaseStatus', function(){
                        vm.StatusUpdate(caseID);
                    });
                    $('<div id="updateCaseStatusDiv" />').html(combo).append(btn).dialog({width:700,title: 'Select Role For User'});
            };
            vm.StatusUpdate=function (caseID) {
                var StatusObject={};
                StatusObject.RefundCase_Id=caseID;
                StatusObject.RefundCaseStatus=$('#updateCaseStatus').children(":selected").val();
                $('#updateCaseStatusDiv').remove();
                $http.post(configuration.path+'/Warehouse/UpdateCaseStatus?token=' + $auth.getToken(), JSON.stringify(StatusObject)).success(function(data){
                    vm.refresh();
                });
            };
            vm.EditCase=function (Data) {

                var detail= JSON.parse(Data.RefundCaseDetail);
                vm.EditFormData=detail;
                vm.EditFormData.Id=Data.RefundCase_Id;
                var editBox=$('#editDiv');
                editBox.dialog({width:700,close:vm.refresh});
                editBox.dialog('open');
            };
            vm.SubmitEditedForm=function () {
                var id=vm.EditFormData.Id;
                /*Delete unwanted properties*/
                delete vm.EditFormData.Id;
                var editBox=$('#editDiv');
                editBox.dialog('destroy');
                $http.post(configuration.path+'/Warehouse/UpdateCaseData/'+id+ '?token=' + $auth.getToken(), JSON.stringify(vm.EditFormData)).success(function(data){
                    vm.refresh();
                });
            };
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
        }
        else
            Logout($auth, $rootScope, $state);
    }
})();
/*Global Variable*/
var user;

/*Global Function*/
function Logout($auth,$rootScope,$state) {
    $auth.logout().then(function() {
        eraseCookie('Role');
        localStorage.removeItem('user');
        $rootScope.authenticated = false;
        $rootScope.currentUser = null;
        $state.go('auth');
    });
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function Back($state) {
    if( window.history.back()== undefined)
    {
        $state.go('users');
    }
    else
        window.history.back();

}
//# sourceMappingURL=OUBO-User.js.map
