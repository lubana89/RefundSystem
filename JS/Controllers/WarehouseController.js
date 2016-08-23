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