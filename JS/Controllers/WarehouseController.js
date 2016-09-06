(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('WarehouseCtrl',['$http', '$auth', '$rootScope', '$state', WarehouseCtrl]);

    function WarehouseCtrl($http, $auth, $rootScope, $state) {
        if(user && getCookie('Role') !=null) {
            var vm = this;
            vm.CasesGrid = [];
            vm.reasons = [];
            vm.wishes = [];
            vm.conditions = [];
            vm.Search='';
            vm.Role=getCookie('Role');
            vm.AllSellers=[];
            vm.Messages='';
            vm.NotificationCount=0;
            vm.NotificationBoxToggle=true;
            vm.StatusDropDownData={
                "1":'Label Generated',
                "2": 'Item Recieved at Warehouse',
                "3":'Item Checked-Status(Dismatch)',
                "4":'Item Checked-case in process',
                "5":'refund-close case'
            };
            vm.refresh = function() {
                if(vm.Search!=''){
                    vm.SearchClick();
                }
                else if(vm.Role=='Admin') {
                    $('#DetailDiv').hide();
                    vm.CasesGrid = [];
                    vm.EditFormData='';
                    $http.get(configuration.path + '/api/AllCases?token=' + $auth.getToken()).success(function (data) {
                        if(data.length >0){
                            $.each(data, function (index) {
                                vm.CasesGrid.push(data[index]);
                            });
                        }
                    });
                }
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
            vm.ReGetNotificationCount=function () {

                $http.get(configuration.path + '/Communication/GetNotificationCount/' + user.id + '?token=' + $auth.getToken()).success(function (data) {
                    vm.NotificationCount = data;
                });

            };
            vm.AllNotifications=function () {
                $state.go('notification');
            };
            vm.ReGetNotificationCount();
            NotificationInterval=setInterval(function(){  vm.ReGetNotificationCount(); }, 300000);
            vm.AllNotifications=function () {
                $state.go('notification');
            };
            vm.ShowNotifications=function () {
                vm.HideDialog();
                if(vm.NotificationBoxToggle){
                    vm.NotificationBoxToggle=false;
                    vm.Messages='';
                    $http.get(configuration.path+'/Communication/GetTopFiveNotifications/'+user.id+ '?token=' + $auth.getToken()).success(function(notifications){
                        if(notifications.data.length>0) {
                            vm.Messages = notifications.data;
                            $('#messageDiv').dialog({
                                width: 300, height: 300, overflow: "auto", position: {
                                    my: 'top',
                                    at: 'bottom',
                                    of: $('#notificationBtn')
                                }, buttons: {
                                    'ShowAll': function () {
                                        vm.HideDialog();
                                        vm.NotificationBoxToggle=true;
                                        vm.AllNotifications();
                                    },
                                    'Mark All as Read': function () {
                                        $http.get(configuration.path + '/Communication/MarkAllNotificationRead/' + user.id + '?token=' + $auth.getToken()).success(function () {
                                            vm.HideDialog();
                                            vm.NotificationBoxToggle=true;
                                            vm.ReGetNotificationCount();
                                        });
                                    }
                                }
                            });
                            $('#messageDiv').dialog('open');
                            $(".ui-dialog-titlebar").remove();
                        }
                    });
                }else{
                    vm.NotificationBoxToggle=true;
                }

            };
            vm.HideDialog=function () {
                if($("#messageDiv").hasClass('ui-dialog-content')){
                    $('#messageDiv').hide();
                    $('#messageDiv').dialog("destroy");
                }

            };
            vm.CreateNotification=function () {
                    $http.get(configuration.path + '/Warehouse/GetAllSellers?token=' + $auth.getToken()).success(function (data) {
                        vm.AllSellers=data;
                        var combo = $("<select class='form-control' id='allSeller'></select>");
                        $.each(vm.AllSellers, function (i, el) {
                            combo.append("<option id="+ el.id +">" + el.name + "</option>");
                        });
                        var textArea  = $('<textarea style="width: 600px; height: 200px;margin: 2%" class="msgText"/>');
                        var btn=$('<input/>').attr({
                            type: "button",
                            value:"Submit",
                            class:'btn btn-danger notificationmessage'
                        });
                        $(document).off('click').on('click', '.notificationmessage', function(){
                            vm.SubmitNotification($('#allSeller').children(":selected").attr("id"),user.id,$('.msgText').val());
                        });
                        $('<div id="notificationmessageDiv" />').html(combo).append(textArea).append(btn).dialog({width:700,title: 'Notify Seller'});
                    });

            };
            vm.SubmitNotification=function (_TO,_FROM,_Message) {
                var notification={};
                notification.to_user_id=_TO;
                notification.from_user_id=_FROM;
                notification.notificationMsg=_Message;
                $http.post(configuration.path+'/Communication/SendNotification?token=' + $auth.getToken(), JSON.stringify(notification)).success(function(data){
                    $('#notificationmessageDiv').remove();
                });
            };
            vm.AddComment=function (messagecase) {
                var textArea  = $('<textarea style="width: 674px; height: 28px;" class="msgText"/>');

                var btn=$('<input/>').attr({
                    type: "button",
                    value:"Submit",
                    style:'margin-top:2%;display:block;',
                    class:'btn btn-danger sendMessage'
                });
                $(document).off('click').on('click', '.sendMessage', function(){
                    vm.MessageSubmitted(messagecase,$('.msgText').val());
                });
                $('<div id="messageDiv" />').html(textArea).append(btn).dialog({width:700,title: 'Add Message'});
            };
            vm.MessageSubmitted=function (messageCase,messageText) {
                var messageobj={};
                messageobj.RefundCase_Id=messageCase.RefundCase_Id;
                messageobj.From_name=user.name;
                messageobj.Seller_Id=messageCase.Seller_Id;
                messageobj.Message=messageText;
                $http.post(configuration.path+'/Communication/AddMessage?token=' + $auth.getToken(), JSON.stringify(messageobj)).success(function(data){
                    $('#messageDiv').remove();
                    vm.refresh();
                });
            };
            vm.SearchClick=function () {
                vm.CasesGrid = [];
                vm.EditFormData='';
                $http.get(configuration.path + '/Warehouse/ReturnedCase/'+ vm.Search +'?token=' + $auth.getToken()).success(function (data) {
                    $('#DetailDiv').hide();
                        if(data.length >0){
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
                        vm.StatusUpdate(caseID,$('#updateCaseStatus').children(":selected").val());
                    });
                    $('<div id="updateCaseStatusDiv" />').html(combo).append(btn).dialog({width:700,title: 'Select Role For User'});
            };
            vm.StatusUpdate=function (caseID,status) {
                var StatusObject={};
                StatusObject.RefundCase_Id=caseID;
                StatusObject.RefundCaseStatus=status;
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
            vm.AddImage=function (id) {
                $state.go('upload',{ casedId:id });
            };
            vm.ShowImages=function (id) {
                $http.get(configuration.path + '/File/GetAllImages/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    var div = $("<div id='allimages'></div>");
                    $.each(data, function (i, el) {
                        div.append("<a target='_blank' href="+el.Image_Path+"\\"+ el.Image_Name +" ><img src="+el.Image_Path+"\\"+ el.Image_Name +" style='height: 60px;width: 60px;margin:10px;border:2px solid black;border-radius: 5px;' /></a>");
                    });
                    $('<div />').html(div).dialog();
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