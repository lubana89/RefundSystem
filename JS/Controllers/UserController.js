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
                vm.EditFormData=Data;
                var editBox=$('#editDiv');
                editBox.dialog({width:700,height:400}).show();
            }
            vm.SubmitEditedForm=function () {
                var id=vm.EditFormData.Id;
                delete vm.EditFormData.Id;
                $http.post(configuration.path+'/Seller/UpdateCaseData/'+id+ '?token=' + $auth.getToken(), JSON.stringify(vm.EditFormData)).success(function(data){
                    $('#editDiv').dialog('close').hide();
                    vm.refresh();
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