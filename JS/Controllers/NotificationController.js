(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('NotificationCtrl',['$http', '$auth', '$rootScope', '$state', NotificationCtrl]);

    function NotificationCtrl($http, $auth, $rootScope, $state) {
        if(user && getCookie('Role') !=null) {
            var vm = this;
            vm.NotificationsGrid='';
            vm.Messages='';
            vm.Role=getCookie('Role');
            vm.refresh=function () {
                vm.NotificationsGrid='';
                $http.get(configuration.path+'/Communication/GetAllNotifications/'+user.id+ '?token=' + $auth.getToken()).success(function(notifications){
                    if(notifications.length>0) {
                        vm.NotificationsGrid = notifications;
                    }
                });
            };
            vm.refresh();
            //mark notification read
            vm.MarkRead=function (id) {
                $http.get(configuration.path+'/Communication/MarkRead/'+id+ '?token=' + $auth.getToken()).success(function(notifications){
                    vm.refresh();
                });
            };
            // mark notification unread
            vm.MarkUnRead=function (id) {
                $http.get(configuration.path+'/Communication/MarkUnRead/'+id+ '?token=' + $auth.getToken()).success(function(notifications){
                    vm.refresh();
                });
            };
            //forward notification to other user dialog
            vm.ForwardNotification=function (id) {
                $http.get(configuration.path + '/api/AllWarehouseUsers?token=' + $auth.getToken()).success(function (data) {
                vm.AllSellers=data;
                var combo = $("<select class='form-control' id='allWarehouse'></select>");
                $.each(vm.AllSellers, function (i, el) {
                    combo.append("<option id="+ el.id +">" + el.name + "</option>");
                });
                var btn=$('<input/>').attr({
                    type: "button",
                    value:"Submit",
                    class:'btn btn-danger notificationmessage'
                });
                $(document).off('click').on('click', '.notificationmessage', function(){
                    vm.SubmitFWDNotification($('#allWarehouse').children(":selected").attr("id"),id);
                });
                $('<div id="notificationmessageDiv" />').html(combo).append(btn).dialog({width:700,title: 'forward to warehouse'});
            });

            };
            //submit forwarded notification
            vm.SubmitFWDNotification=function (_TO,_ID) {
                var notification={};
                notification.to_user_id=_TO;
                notification.id=_ID;
                $http.post(configuration.path+'/api/UpdateNotification?token=' + $auth.getToken(), JSON.stringify(notification)).success(function(data){
                    $('#notificationmessageDiv').remove();
                    vm.refresh();
                });
            };
            //reply to the message
            vm.ReplyMessage=function (NotificationMessage) {

                    var textArea  = $('<textarea style="width: 600px; height: 200px;margin: 2%" class="msgText"/>');
                    var btn=$('<input/>').attr({
                        type: "button",
                        value:"Submit",
                        class:'btn btn-danger notificationmessage'
                    });
                    $(document).off('click').on('click', '.notificationmessage', function(){
                        vm.SubmitNotification(NotificationMessage,user.id,$('.msgText').val());
                    });
                    $('<div id="notificationmessageDiv" />').html(textArea).append(btn).dialog({width:700,title: 'Reply'});

            };
            //show all chain messages
            vm.MessageChain=function (id) {
                vm.Messages='';
                $http.get(configuration.path+'/Communication/GetChainNotifications/'+id+ '?token=' + $auth.getToken()).success(function(notifications){
                    vm.Messages=notifications;
                    $('#messageDiv').dialog({width:400,title:'Messages',height:500, overflow:"auto"});
                    $('#messageDiv').dialog('open');

                } );
            };
            //submit notification
            vm.SubmitNotification=function (NotificationMessage,_FROM,_Message) {

                var notification={};
                notification.parent_id=NotificationMessage.Id;
                notification.to_user_id=NotificationMessage.ReplyBackTo;
                notification.from_user_id=_FROM;
                notification.notificationMsg=_Message;
                $http.post(configuration.path+'/Communication/ReplyNotification?token=' + $auth.getToken(), JSON.stringify(notification)).success(function(data){
                    $('#notificationmessageDiv').remove();
                    vm.refresh();
                });
            };
            vm.Back=function () {
                Back($state);
            };
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
        }else{
            Logout($auth, $rootScope, $state);
        }

    }
})();
