
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
                });
        })
        .run(function($rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function(event, toState) {
                 user = JSON.parse(localStorage.getItem('user'));
                if(user) {
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = user;
                    if(toState.name === "auth") {
                        event.preventDefault();
                       /* $state.go('users');*/

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

                    $state.go('users');

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
            vm.Admin=getCookie('admin');
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
            }
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
            }
            vm.ToUserGrid=function () {
                if ($rootScope.authenticated && vm.Admin=="true")
                    $state.go('manageuser');
                else
                    vm.logout();
            }
            vm.EditCase=function (Data) {
                vm.EditFormData='';
                vm.EditFormData=Data;

                var editBox=$('#editDiv');
                editBox.dialog({width:700,close:vm.refresh});
                editBox.dialog('open');
            }
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
            }
            vm.GetLink=function (id) {
                $http.get(configuration.path + '/Seller/GetLink/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    $('<div />').html(data).dialog({
                        title: 'Copy & Send To Customer', width: $(window).width() - 20,
                        height: 200
                    });
                });
            }
            vm.DeleteCase=function (id) {
                $http.get(configuration.path + '/Seller/DeleteCase/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    vm.refresh();
                });
            }
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
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
                   Back();
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
        if(user && getCookie('admin')=="true") {
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
            vm.ToSellerForm = function () {
                if ($rootScope.authenticated)
                    $state.go('sellerrefundform');
                else
                    vm.logout();
            };
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
                UserBox.dialog('destroy');
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
                Back();
            }
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
        eraseCookie('admin');
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
function Back() {
    window.history.back();
}
//# sourceMappingURL=OUBO-User.js.map
