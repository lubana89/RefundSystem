(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('UserController',['$http','$auth','$rootScope','$state', UserController]);

    function UserController($http, $auth, $rootScope, $state) {
        if(user && getCookie('Role') !=null) {
            var vm = this;
            vm.CasesGrid = [];
            vm.reasons = [];
            vm.wishes = [];
            vm.conditions = [];
            vm.Messages='';
            vm.Role=getCookie('Role');
            vm.NotificationCount=0;
            vm.NotificationBoxToggle=true;
            //add image to case
            vm.AddImage=function (id) {
                $state.go('upload',{ casedId:id });
            };
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
            // check is there any new notification
            vm.ReGetNotificationCount=function () {

                    $http.get(configuration.path + '/Communication/GetNotificationCount/' + user.id + '?token=' + $auth.getToken()).success(function (data) {
                        vm.NotificationCount = data;
                    });

            };
            vm.ReGetNotificationCount();
            NotificationInterval=setInterval(function(){  vm.ReGetNotificationCount(); }, 300000);
            //get all notifications
            vm.AllNotifications=function () {
                $state.go('notification');
            };
            //show notifications
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
            // redirect to seller form
            vm.ToSellerForm = function () {
                if ($rootScope.authenticated)
                    $state.go('sellerrefundform');
                else
                    vm.logout();
            };
            // redirect to manage user page
            vm.ToUserGrid=function () {
                if ($rootScope.authenticated && vm.Role=="Admin")
                    $state.go('manageuser');
                else
                    vm.logout();
            };
            //redirect to warehouse page
            vm.ToWarehouseGrid=function () {
                if ($rootScope.authenticated && vm.Role=="Admin")
                    $state.go('warehouse');
                else
                    vm.logout();
            };
            //edit the case
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
            //get case link
            vm.GetLink=function (id) {
                $http.get(configuration.path + '/Seller/GetLink/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    $('<div />').html(data).dialog({
                        title: 'Copy & Send To Customer', width: $(window).width() - 20,
                        height: 200
                    });
                });
            };
            // delete case
            vm.DeleteCase=function (id) {
                $http.get(configuration.path + '/Seller/DeleteCase/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    vm.refresh();
                });
            };
            // show case related messages
            vm.ShowMessages=function (id) {
                vm.HideDialog();
                vm.NotificationBoxToggle=true;
                vm.Messages='';
                $http.get(configuration.path + '/Communication/GetAllMessage/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    if(data.length>0){
                    vm.Messages=data;
                    $('#messageDiv').dialog({width:400,title:'Messages',height:500, overflow:"auto"});
                    $('#messageDiv').dialog('open');
                    }
                });
            };
            //show case images
            vm.ShowImages=function (id) {
                $http.get(configuration.path + '/Communication/File/GetAllImages/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    var div = $("<div id='allimages'></div>");
                    $.each(data, function (i, el) {
                        div.append("<a target='_blank' href="+el.Image_Path+"\\"+ el.Image_Name +" ><img src="+el.Image_Path+"\\"+ el.Image_Name +" style='height: 60px;width: 60px;margin:10px;border:2px solid black;border-radius: 5px;' /></a>");
                    });
                    $('<div />').html(div).dialog();
                });
            };
            //create notification
            vm.CreateNotification=function () {
                $http.get(configuration.path + '/Seller/GetAllAdmins?token=' + $auth.getToken()).success(function (data) {
                    vm.AllSellers=data;
                    var combo = $("<select class='form-control' id='allAdmin'></select>");
                    $.each(vm.AllSellers, function (i, el) {
                        combo.append("<option id="+ el.id +">" + el.name + "</option>");
                    });
                    var textArea  = $('<textarea style="width: 600px; height: 200px;margin: 2%" class="msgAdminText"/>');
                    var btn=$('<input/>').attr({
                        type: "button",
                        value:"Submit",
                        class:'btn btn-danger notificationmessage'
                    });
                    $(document).off('click').on('click', '.notificationmessage', function(){
                        vm.SubmitNotification($('#allAdmin').children(":selected").attr("id"),user.id,$('.msgAdminText').val());
                    });
                    $('<div id="notificationmessageDiv" />').html(combo).append(textArea).append(btn).dialog({width:700,title: 'Notify Admin'});
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
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
        }
        else
            Logout($auth, $rootScope, $state);
    }
})();