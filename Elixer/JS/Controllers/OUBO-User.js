/*Global Variable*/
var user,NotificationInterval;

/*Global Function*/
function Logout($auth,$rootScope,$state) {
    $.get(configuration.path + '/logout?token=' + $auth.getToken());
    $auth.logout().then(function() {
        if(getCookie('Role')=='Seller'){
            clearInterval(NotificationInterval);
        }
        eraseCookie('Role');
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
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}
function Back($state) {
    if( window.history.back()== undefined)
    {
        $state.go('users');
    }
    else
        window.history.back();

}


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
                })
                .state('warehouse', {
                    url: '/warehouse',
                    templateUrl: '../resources/views/Warehouse.blade.php',
                    controller: 'WarehouseCtrl as warehouse'
                })
                .state('notification', {
                url: '/notification',
                templateUrl: '../resources/views/Notification.blade.php',
                controller: 'NotificationCtrl as notification'
            });
        })
        .run(function($rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
                 user = JSON.parse(localStorage.getItem('user'));
                if(user) {
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = user;
                    if(toState.name === "auth") {
                        event.preventDefault();
                        if(fromState.name === ""){
                            $state.go('users');
                        }
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
            };

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
                    $http.get(configuration.path+'/api/GetRole?token='+$auth.getToken()).success(function (data) {
                        createCookie('Role',data);
                        if(data != 'Warehouse')
                        $state.go('users');
                        else if(data == 'Warehouse')
                            $state.go('warehouse');
                    }).error(function(error) {
                        vm.loginError = true;
                        vm.loginErrorText ='Role Not Assigned!';
                        Logout($auth,$rootScope,$state);
                    });
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
        .controller('UserController', UserController).directive('message', function() {
        var directive = {};
        directive.template = '<div class="media-body"><span class="text-muted pull-right"><small class="text-muted">{{message.DateTime}}</small></span><strong class="text-success">@{{message.From_name}}</strong><p>{{message.Message}}</p></div><hr>';
        return directive;
    });

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
            vm.ReGetNotificationCount=function () {

                    $http.get(configuration.path + '/Communication/GetNotificationCount/' + user.id + '?token=' + $auth.getToken()).success(function (data) {
                        vm.NotificationCount = data;
                    });

            };

            vm.ReGetNotificationCount();
                NotificationInterval=setInterval(function(){  vm.ReGetNotificationCount(); }, 60000);

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
            vm.ShowMessages=function (id) {
                vm.HideDialog();
                vm.NotificationBoxToggle=true;
                vm.Messages='';
                $http.get(configuration.path + '/Communication/GetAllMessage/' +id + '?token=' + $auth.getToken()).success(function (data) {
                    vm.Messages=data;
                    $('#messageDiv').dialog({width:400,title:'Messages',height:500, overflow:"auto",close:function(){$('#messageDiv').remove();}});
                    $('#messageDiv').dialog('open');
                });
            };
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
(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('SellerRefundFormCtrl',function ($scope, $http,$auth,$rootScope,$state) {
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
            }
            $scope.Back = function () {
                   Back($state);
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
        if(user && getCookie('Role') !=null) {
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
                UserBox.remove();
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
                    vm.refresh();
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
                Back($state);
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
        .controller('WarehouseCtrl', WarehouseCtrl);

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
            NotificationInterval=setInterval(function(){  vm.ReGetNotificationCount(); }, 60000);

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
                $http.post(configuration.path+'/Warehouse/AddMessage?token=' + $auth.getToken(), JSON.stringify(messageobj)).success(function(data){
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
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
        }
        else
            Logout($auth, $rootScope, $state);
    }
})();
(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('NotificationCtrl', NotificationCtrl)

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
            vm.MarkRead=function (id) {
                $http.get(configuration.path+'/Communication/MarkRead/'+id+ '?token=' + $auth.getToken()).success(function(notifications){
                    vm.refresh();
                });
            };
            vm.MarkUnRead=function (id) {
                $http.get(configuration.path+'/Seller/MarkUnRead/'+id+ '?token=' + $auth.getToken()).success(function(notifications){
                    vm.refresh();
                });
            };
            vm.ForwardNotification=function (id) {$http.get(configuration.path + '/api/AllWarehouseUsers?token=' + $auth.getToken()).success(function (data) {
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
            vm.SubmitFWDNotification=function (_TO,_ID) {
                var notification={};
                notification.to_user_id=_TO;
                notification.id=_ID;
                $http.post(configuration.path+'/api/UpdateNotification?token=' + $auth.getToken(), JSON.stringify(notification)).success(function(data){
                    $('#notificationmessageDiv').remove();
                    vm.refresh();
                });
            };
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
            vm.MessageChain=function (id) {
                vm.Messages='';
                $http.get(configuration.path+'/Communication/GetChainNotifications/'+id+ '?token=' + $auth.getToken()).success(function(notifications){
                    vm.Messages=notifications;
                    $('#messageDiv').dialog({width:400,title:'Messages',height:500, overflow:"auto",close:function(){$('#messageDiv').remove();}});
                    $('#messageDiv').dialog('open');

                } );
            };
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

//# sourceMappingURL=OUBO-User.js.map
