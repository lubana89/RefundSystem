(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('UserController', UserController);

    function UserController($http, $auth, $rootScope, $state) {
        if(user) {
            var vm = this;
            vm.CasesGrid = [];
            vm.users;
            vm.error;
            $http.get(configuration.path + '/Seller/AllCases/' + user.id + '?token=' + $auth.getToken()).success(function (data) {
                $.each(data, function (index) {
                    vm.CasesGrid.push(JSON.parse(data[index].RefundCaseDetail));
                });
            });
            vm.ToSellerForm = function () {
                if ($rootScope.authenticated)
                    $state.go('sellerrefundform');
                else
                    vm.logout();
            }

            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            }
        }
        else
            Logout($auth, $rootScope, $state);
    }
})();