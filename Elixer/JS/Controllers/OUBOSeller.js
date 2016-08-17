
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
            $scope.SubmitForm = function () {
                if ($scope.form.sellerNumber != "") {
                    $http.post(configuration.path + '/GenerateRefundLink?token=' + $auth.getToken(), JSON.stringify($scope.form)).success(function (data) {

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

/*Global Variable*/
var user;

/*Global Function*/
function Logout($auth,$rootScope,$state) {
    $auth.logout().then(function() {

        localStorage.removeItem('user');
        $rootScope.authenticated = false;
        $rootScope.currentUser = null;
        $state.go('auth');
    });

}
//# sourceMappingURL=OUBOSeller.js.map
