(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('SellerRefundFormCtrl',['$scope', '$http','$auth','$rootScope','$state',function ($scope, $http,$auth,$rootScope,$state) {
            if(user && getCookie('Role') !=null) {
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
            };
            $scope.Back = function () {
                   Back($state);
            };
            // submit new case
            $scope.SubmitForm = function () {
                if ($scope.form.sellerNumber != "") {
                    $http.post(configuration.path + '/Seller/GenerateRefundLink?token=' + $auth.getToken(), JSON.stringify($scope.form)).success(function (data) {
                        // link for customer to generate QR
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
}]);
})();
