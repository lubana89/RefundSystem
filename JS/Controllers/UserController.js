(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('UserController', UserController);

    function UserController($http, $auth, $rootScope, $state) {
        if(user && getCookie('Role') !=null) {

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