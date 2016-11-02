function Logout(e, o, t) {
    $.get(configuration.path + "/logout?token=" + e.getToken()), e.logout().then(function () {
        "Seller" == getCookie("Role") && clearInterval(NotificationInterval), eraseCookie("Role"), localStorage.removeItem("user"), o.authenticated = !1, o.currentUser = null, t.go("auth")
    })
}

function createCookie(e, o, t) {
    if (t) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * t * 60 * 60 * 1e3);
        var i = "; expires=" + n.toGMTString()
    } else var i = "";
    document.cookie = e + "=" + o + i + "; path=/"
}

function getCookie(e) {
    for (var o = e + "=", t = document.cookie.split(";"), n = 0; n < t.length; n++) {
        for (var i = t[n];
             " " == i.charAt(0);) i = i.substring(1, i.length);
        if (0 == i.indexOf(o)) return i.substring(o.length, i.length)
    }
    return null
}

function eraseCookie(e) {
    document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/"
}

function Back(e) {
    void 0 == window.history.back() ? e.go("users") : window.history.back()
}
function getUrlParameter(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
var user, NotificationInterval;
(function () {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('AuthController', ['$auth', '$state', '$http', '$rootScope', 'ApiSVC', AuthController]);


    function AuthController($auth, $state, $http, $rootScope, ApiSVC) {
        var vm = this;
        vm.loginError = false;
        vm.loginErrorText;
        vm.login = function () {
            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials).then(function () {

                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chain
                return ApiSVC.GetAuthenticatedUser().then(function (response) {


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
                    ApiSVC.GetRole().success(function (data) {
                        //Create Cookie To show menu as per role
                        createCookie('Role', data);
                        //all users except warehouse will go to page users
                        if (data != 'Warehouse')
                            $state.go('users');
                        else if (data == 'Warehouse')
                            $state.go('warehouse');
                    }).error(function (error) {
                        vm.loginError = true;
                        vm.loginErrorText = 'Role Not Assigned!';
                        Logout($auth, $rootScope, $state);
                    });
                });

                // Handle errors
            }, function (error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;
            });

        }

    }

})();
(function () {

    'use strict';

    angular
        .module('RefundSystemApp').directive('jqdatepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                element.datepicker({
                    dateFormat: 'DD, d  MM, yy'
                });
            }
        };
    })
})();
(function () {

    'use strict';

    angular
        .module('RefundSystemApp')
        .directive('message', function () {
            var directive = {};
            directive.template = '<div class="media-body"><span class="text-muted pull-right"><small class="text-muted">{{message.DateTime}}</small></span><strong class="text-success">@{{message.From_name}}</strong><p>{{message.Message}}</p></div><hr>';
            return directive;
        });
})();
(function () {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('MenuController', ['$auth', '$state', '$rootScope', MenuController]);


    function MenuController($auth, $state, $rootScope) {
        if (user && getCookie('Role') != null) {
            var vm = this;
            vm.Role = getCookie('Role');
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
            // redirect to seller form
            vm.ToSellerForm = function () {
                if ($rootScope.authenticated && vm.Role != "Warehouse")
                    $state.go('sellerrefundform');
                else
                    vm.logout();
            };
            //get all notifications
            vm.AllNotifications = function () {
                $state.go('notification');
            };
            // redirect to manage user page
            vm.ToUserGrid = function () {
                if ($rootScope.authenticated && vm.Role == "Admin")
                    $state.go('manageuser');
                else
                    vm.logout();
            };
            //redirect to warehouse page
            vm.ToWarehouseGrid = function () {
                if ($rootScope.authenticated && vm.Role != "Seller")
                    $state.go('warehouse');
                else
                    vm.logout();
            };
            vm.ToUserPage=function () {
                if ($rootScope.authenticated && vm.Role != "Warehouse")
                    $state.go('users');
                else
                    vm.logout();
            };
        }
    }

})();
(function () {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('UserController', ['$http', '$auth', '$rootScope', '$state', 'SellerSVC', 'CommunicationSVC', UserController]);

    function UserController($http, $auth, $rootScope, $state, SellerSVC, CommunicationSVC) {
        if (user && getCookie('Role') != null) {
            var vm = this;
            vm.CasesGrid = [];
            vm.reasons = [];
            vm.wishes = [];
            vm.conditions = [];
            vm.Messages = '';
            vm.Role = getCookie('Role');
            vm.NotificationCount = 0;
            vm.NotificationBoxToggle = true;
            //add image to case
            vm.AddImage = function (id) {
                $state.go('upload', {casedId: id});
            };
            vm.refresh = function () {
                vm.CasesGrid = [];
                SellerSVC.GetAllSellerCase().success(function (data) {
                    $.each(data, function (index) {
                        var detail = JSON.parse(data[index].RefundCaseDetail);
                        var id = JSON.parse(data[index].RefundCase_Id);
                        detail.Id = id;
                        detail.IsLabelGenerated = data[index].RefundCaseStatusKey == "" ? false : true;
                        vm.CasesGrid.push(detail);
                    });

                });
            };
            vm.refresh();
            // check is there any new notification
            vm.ReGetNotificationCount = function () {
                CommunicationSVC.GetNotificationCount().success(function (data) {
                    vm.NotificationCount = data;
                });
            };
            vm.ReGetNotificationCount();
            NotificationInterval = setInterval(function () {
                vm.ReGetNotificationCount();
            }, 60000);
            //get all notifications
            vm.AllNotifications = function () {
                $state.go('notification');
            };
            //show notifications
            vm.ShowNotifications = function () {
                vm.HideDialog();
                if (vm.NotificationBoxToggle) {
                    vm.NotificationBoxToggle = false;
                    vm.Messages = '';
                    CommunicationSVC.GetTopFiveNotification().success(function (notifications) {
                        if (notifications.data.length > 0) {
                            vm.Messages = notifications.data;
                            $('#messageDiv').dialog({
                                width: 300, height: 300, overflow: "auto", position: {
                                    my: 'top',
                                    at: 'bottom',
                                    of: $('#notificationBtn')
                                }, buttons: {
                                    'ShowAll': function () {
                                        vm.HideDialog();
                                        vm.NotificationBoxToggle = true;
                                        vm.AllNotifications();
                                    },
                                    'Mark All as Read': function () {
                                        CommunicationSVC.MarkAllNotificationRead().success(function () {
                                            vm.HideDialog();
                                            vm.NotificationBoxToggle = true;
                                            vm.ReGetNotificationCount();
                                        });
                                    }
                                }
                            });
                            $('#messageDiv').dialog('open');
                            $(".ui-dialog-titlebar").remove();
                        }
                    });
                } else {
                    vm.NotificationBoxToggle = true;
                }

            };
            vm.HideDialog = function () {
                if ($("#messageDiv").hasClass('ui-dialog-content')) {
                    $('#messageDiv').hide();
                    $('#messageDiv').dialog("destroy");
                }

            };
            $http.get(configuration.path + '/wish').success(function (data) {
                $.each(data, function (index) {
                    vm.wishes.push(data[index].Wish);
                });
            });
            $http.get(configuration.path + '/reason').success(function (data) {
                $.each(data, function (index) {
                    vm.reasons.push(data[index].Reason);
                });
            });
            $http.get(configuration.path + '/itemCondition').success(function (data) {
                $.each(data, function (index) {
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
            vm.ToUserGrid = function () {
                if ($rootScope.authenticated && vm.Role == "Admin")
                    $state.go('manageuser');
                else
                    vm.logout();
            };
            //redirect to warehouse page
            vm.ToWarehouseGrid = function () {
                if ($rootScope.authenticated && vm.Role == "Admin")
                    $state.go('warehouse');
                else
                    vm.logout();
            };
            //edit the case
            vm.EditCase = function (Data) {
                vm.EditFormData = '';
                vm.EditFormData = Data;

                var editBox = $('#editDiv');
                editBox.dialog({width: 700, close: vm.refresh});
                editBox.dialog('open');
            };
            vm.SubmitEditedForm = function () {
                var id = vm.EditFormData.Id;
                /*Delete unwanted properties*/
                delete vm.EditFormData.Id;
                delete vm.EditFormData.IsLabelGenerated;

                var editBox = $('#editDiv');
                editBox.dialog('destroy');
                SellerSVC.UpdateCaseData(id, vm.EditFormData).success(function (data) {
                    vm.refresh();
                });
            };
            //get case link
            vm.GetLink = function (id) {
                SellerSVC.GetLink(id).success(function (data) {
                    $('<div />').html(data).dialog({
                        title: 'Case Link', width: $(window).width() - 20,
                        height: 200
                    });
                });
            };
            // Mail Link
            vm.MailLink=function (id) {
                SellerSVC.MailLink(id).success(function (data) {
                    $('<div />').html(data).dialog({title: 'Message', width: 400,height: 350});
                });
            };
            // delete case
            vm.DeleteCase = function (id) {
                SellerSVC.DeleteCase(id).success(function (data) {
                    vm.refresh();
                });
            };
            // show case related messages
            vm.ShowMessages = function (id) {
                vm.HideDialog();
                vm.NotificationBoxToggle = true;
                vm.Messages = '';
                CommunicationSVC.GetAllMessages(id).success(function (data) {
                    if (data.length > 0) {
                        vm.Messages = data;
                        $('#messageDiv').dialog({width: 400, title: 'Messages', height: 500, overflow: "auto"});
                        $('#messageDiv').dialog('open');
                    }
                });
            };
            //show case images
            vm.ShowImages = function (id) {
                CommunicationSVC.GetAllImages(id).success(function (data) {
                    if (data.length > 0) {
                        var div = $("<div id='allimages'></div>");
                        $.each(data, function (i, el) {
                            div.append("<a target='_blank' href=" + el.Image_Path + "\\" + el.Image_Name + " ><img src=" + el.Image_Path + "\\" + el.Image_Name + " style='height: 60px;width: 60px;margin:10px;border:2px solid black;border-radius: 5px;' /></a>");
                        });
                        $('<div />').html(div).dialog();
                    }
                });
            };
            //create notification
            vm.CreateNotification = function () {
                SellerSVC.GetAllAdmins().success(function (data) {
                    vm.AllSellers = data;
                    var combo = $("<select class='form-control' id='allAdmin'></select>");
                    $.each(vm.AllSellers, function (i, el) {
                        combo.append("<option id=" + el.id + ">" + el.name + "</option>");
                    });
                    var textArea = $('<textarea style="width: 600px; height: 200px;margin: 2%" class="msgAdminText"/>');
                    var btn = $('<input/>').attr({
                        type: "button",
                        value: "Submit",
                        class: 'btn btn-danger notificationmessage'
                    });
                    $(document).off('click').on('click', '.notificationmessage', function () {
                        vm.SubmitNotification($('#allAdmin').children(":selected").attr("id"), user.id, $('.msgAdminText').val());
                    });
                    $('<div id="notificationmessageDiv" />').html(combo).append(textArea).append(btn).dialog({
                        width: 700,
                        title: 'Notify Admin'
                    });
                });

            };
            vm.SubmitNotification = function (_TO, _FROM, _Message) {
                var notification = {};
                notification.to_user_id = _TO;
                notification.from_user_id = _FROM;
                notification.notificationMsg = _Message;
                CommunicationSVC.SendNotification(notification).success(function (data) {
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
(function () {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('SellerRefundFormCtrl', ['$scope', '$http', '$auth', '$rootScope', '$state', 'SellerSVC', function ($scope, $http, $auth, $rootScope, $state, SellerSVC) {
            if (user && getCookie('Role') != null) {
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
                $scope.customerdata=JSON.parse(getUrlParameter('customerdata'));
                if($scope.customerdata !=undefined){
                    $scope.form=$scope.customerdata;
                    $scope.form.sellerNumber=user.id;
                }
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
                // submit new case
                $scope.SubmitForm = function () {
                    if ($scope.form.sellerNumber != "") {
                        SellerSVC.GenerateRefundLink($scope.form).success(function (data) {
                            // link for customer to generate QR/Bar Code
                            $('<div />').html(data).dialog({title: 'Message', width: 400,height: 350,close: $scope.Back});
                        });
                    }
                };
                $scope.logout = function () {
                    Logout($auth, $rootScope, $state);
                };
                $scope.Back = function () {
                    Back($state);
                };
            } else {
                Logout($auth, $rootScope, $state);
            }
        }]);
})();

(function () {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('ManageUserCtrl', ['$http', '$auth', '$rootScope', '$state', 'ApiSVC', ManageUserCtrl]);

    function ManageUserCtrl($http, $auth, $rootScope, $state, ApiSVC) {
        if (user && getCookie('Role') != null) {
            var vm = this;
            vm.refresh = function () {
                vm.UserGrid = [];
                vm.EditFormData = '';
                ApiSVC.GetAllUsers().success(function (data) {
                    jQuery.each(data.users, function (i, val) {
                        if (val.id == user.id) {
                            delete data.users[i];
                        }
                    });
                    vm.UserGrid = data.users;

                });
            };
            vm.refresh();
            // user edit dialog
            vm.EditUser = function (Data) {
                vm.EditFormData = Data;
                var editBox = $('#editDiv');
                editBox.dialog({width: 700, close: vm.refresh});
                editBox.dialog('open');
            };
            //submit edited data of user
            vm.SubmitEditedForm = function () {
                var editBox = $('#editDiv');
                editBox.dialog('destroy');
                ApiSVC.UpdateUser(vm.EditFormData).success(function (data) {
                    vm.refresh();
                });
            };
            // create new user dialog
            vm.OpenAddUserForm = function () {
                var UserBox = $('#addUserDiv');
                UserBox.dialog({width: 700, close: vm.refresh});
                UserBox.dialog('open');
            };
            //create new user
            vm.SubmitNewUserForm = function () {
                var UserBox = $('#addUserDiv');
                UserBox.dialog('destroy');
                ApiSVC.CreateUser(vm.EditFormData).success(function (data) {
                    vm.refresh();
                });
            };
            //Assign role to user dialog
            vm.AttachRole = function (userData) {
                ApiSVC.GetAllRoles().success(function (data) {
                    var combo = $("<select class='form-control' id='asnRoleSelect'></select>");

                    $.each(data, function (i, el) {
                        combo.append("<option id=" + el.id + ">" + el.name + "</option>");
                    });
                    var btn = $('<input/>').attr({
                        type: "button",
                        value: "Attach Role",
                        style: 'margin-top:2%',
                        class: 'btn btn-danger attachRole'
                    });
                    $(document).off('click').on('click', '.attachRole', function () {

                        vm.AssignRole(userData);
                    });
                    $('<div  id="asnRole"/>').html(combo).append(btn).dialog({
                        width: 700,
                        title: 'Select Role For User'
                    });
                });
            };
            //assign role
            vm.AssignRole = function (userData) {
                userData.role = $('#asnRoleSelect').children(":selected").attr("id");
                $('#asnRole').remove();
                ApiSVC.AssignRole(userData).success(function (data) {
                    vm.refresh();
                });

            };
            //delete user
            vm.DeleteUser = function (id) {
                ApiSVC.DeleteUser(id).success(function (data) {
                    vm.refresh();
                });
            };
            //create new role
            vm.CreateRole = function () {
                alert('Feature Not Implemented Yet!');
            };
            //create new permission
            vm.CreatePermission = function () {
                alert('Feature Not Implemented Yet!');
            };
            //attach permission to role
            vm.AttachPermissionRole = function () {
                alert('Feature Not Implemented Yet!');
            };
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
            vm.Back = function () {
                Back($state);
            };
        }
        else
            Logout($auth, $rootScope, $state);
    }
})();
(function () {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('WarehouseCtrl', ['$document', '$http', '$auth', '$rootScope', '$state', 'WarehouseSVC', 'CommunicationSVC', 'ApiSVC', WarehouseCtrl]);

    function WarehouseCtrl($document, $http, $auth, $rootScope, $state, WarehouseSVC, CommunicationSVC, ApiSVC) {
        if (user && getCookie('Role') != null) {

            var vm = this;
            vm.CasesGrid = [];
            vm.reasons = [];
            vm.wishes = [];
            vm.conditions = [];
            vm.Search = '';
            vm.Role = getCookie('Role');
            vm.AllSellers = [];
            vm.Messages = '';
            vm.NotificationCount = 0;
            vm.NotificationBoxToggle = true;
            vm.GridStyle = {color: 'black'};
            vm.GridInit = function (textcolor, clearGrid) {
                $(".search-query").val('');
                //default focus
                $(".search-query").focus();


                if (clearGrid) {
                    vm.CasesGrid = [];
                    vm.GridStyle = {color: textcolor};
                } else {
                    vm.GridStyle = {color: 'black'};
                }

                vm.EditFormData = '';
            };
            //Case Satus options
            vm.StatusDropDownData = {
                "1": 'Label Generated',
                "2": 'In Warehouse',
                "3": 'In Process',
                "4": 'Rejected|Closed',
                "5": 'Passed|Closed'
            };
            // keyboard key handler
            vm.KeyHandler = function (event) {

                switch (event.keyCode) {
                    case 113:
                        vm.AllBufferCases(true);
                        break;
                    case 115:

                        vm.AllForecastCases(true);
                        break;
                    case 119:

                        vm.AllArchivedCases(true);
                        break;
                    case 13:
                        vm.SearchClick(true);
                        break;

                }
            };
            $document.unbind('keyup').bind('keyup', vm.KeyHandler);
            vm.AllBufferCases = function (clearGrid) {
                vm.GridInit('blue', clearGrid);
                WarehouseSVC.GetAllBufferCases().success(function (data) {
                    if (data.length > 0) {
                        $.each(data, function (index) {
                            vm.CasesGrid.push(data[index]);
                        });
                    }
                });
            };
            vm.AllForecastCases = function (clearGrid) {
                vm.GridInit('red', clearGrid);
                WarehouseSVC.GetAllForecastCases().success(function (data) {
                    if (data.length > 0) {
                        $.each(data, function (index) {
                            vm.CasesGrid.push(data[index]);
                        });
                    }
                });
            };
            vm.AllArchivedCases = function (clearGrid) {
                vm.GridInit('green', clearGrid);
                WarehouseSVC.GetAllArchivedCases().success(function (data) {
                    if (data.length > 0) {
                        $.each(data, function (index) {
                            vm.CasesGrid.push(data[index]);
                        });
                    }
                });
            };
            vm.refresh = function () {
                vm.AllBufferCases(true);
                vm.AllForecastCases(false);
            };
            vm.refresh();
            $http.get(configuration.path + '/wish').success(function (data) {
                $.each(data, function (index) {
                    vm.wishes.push(data[index].Wish);
                });
            });
            $http.get(configuration.path + '/reason').success(function (data) {
                $.each(data, function (index) {
                    vm.reasons.push(data[index].Reason);
                });
            });
            $http.get(configuration.path + '/itemCondition').success(function (data) {
                $.each(data, function (index) {
                    vm.conditions.push(data[index].ItemCondition);
                });
            });
            vm.ReGetNotificationCount = function () {
                CommunicationSVC.GetNotificationCount().success(function (data) {
                    vm.NotificationCount = data;
                });
            };
            vm.ReGetNotificationCount();
            NotificationInterval = setInterval(function () {
                vm.ReGetNotificationCount();
            }, 60000);

            vm.ShowNotifications = function () {
                vm.HideDialog();
                if (vm.NotificationBoxToggle) {
                    vm.NotificationBoxToggle = false;
                    vm.Messages = '';
                    CommunicationSVC.GetTopFiveNotification().success(function (notifications) {
                        if (notifications.data.length > 0) {
                            vm.Messages = notifications.data;
                            $('#messageDiv').dialog({
                                width: 300, height: 300, overflow: "auto", position: {
                                    my: 'top',
                                    at: 'bottom',
                                    of: $('#notificationBtn')
                                }, buttons: {
                                    'ShowAll': function () {
                                        vm.HideDialog();
                                        vm.NotificationBoxToggle = true;
                                        vm.AllNotifications();
                                    },
                                    'Mark All as Read': function () {
                                        CommunicationSVC.MarkAllNotificationRead.success(function () {
                                            vm.HideDialog();
                                            vm.NotificationBoxToggle = true;
                                            vm.ReGetNotificationCount();
                                        });
                                    }
                                }
                            });
                            $('#messageDiv').dialog('open');
                            $(".ui-dialog-titlebar").remove();
                        }
                    });
                } else {
                    vm.NotificationBoxToggle = true;
                }

            };
            vm.HideDialog = function () {
                if ($("#messageDiv").hasClass('ui-dialog-content')) {
                    $('#messageDiv').hide();
                    $('#messageDiv').dialog("destroy");
                }

            };
            vm.CreateNotification = function () {
                WarehouseSVC.GetAllSellers().success(function (data) {
                    vm.AllSellers = data;
                    var combo = $("<select class='form-control' id='allSeller'></select>");
                    $.each(vm.AllSellers, function (i, el) {
                        combo.append("<option id=" + el.id + ">" + el.name + "</option>");
                    });
                    var textArea = $('<textarea style="width: 600px; height: 200px;margin: 2%" class="msgText"/>');
                    var btn = $('<input/>').attr({
                        type: "button",
                        value: "Submit",
                        class: 'btn btn-danger notificationmessage'
                    });
                    $(document).off('click').on('click', '.notificationmessage', function () {
                        vm.SubmitNotification($('#allSeller').children(":selected").attr("id"), user.id, $('.msgText').val());
                    });
                    $('<div id="notificationmessageDiv" />').html(combo).append(textArea).append(btn).dialog({
                        width: 700,
                        title: 'Notify Seller'
                    });
                });

            };
            vm.SubmitNotification = function (_TO, _FROM, _Message) {
                var notification = {};
                notification.to_user_id = _TO;
                notification.from_user_id = _FROM;
                notification.notificationMsg = _Message;
                CommunicationSVC.SendNotification(notification).success(function (data) {
                    $('#notificationmessageDiv').remove();
                });
            };
            vm.AddComment = function (messagecase) {
                var textArea = $('<textarea style="width: 674px; height: 28px;" class="msgText"/>');

                var btn = $('<input/>').attr({
                    type: "button",
                    value: "Submit",
                    style: 'margin-top:2%;display:block;',
                    class: 'btn btn-danger sendMessage'
                });
                $(document).off('click').on('click', '.sendMessage', function () {
                    vm.MessageSubmitted(messagecase, $('.msgText').val());
                });
                $('<div id="casemessageDiv" />').html(textArea).append(btn).dialog({width: 700, title: 'Add Message'});
            };
            vm.MessageSubmitted = function (messageCase, messageText) {
                var messageobj = {};
                messageobj.RefundCase_Id = messageCase.RefundCase_Id;
                messageobj.From_name = user.name;
                messageobj.Seller_Id = messageCase.Seller_Id;
                messageobj.Message = messageText;
                CommunicationSVC.AddMessage(messageobj).success(function (data) {
                    $('#casemessageDiv').dialog("destroy");
                    vm.refresh();
                });
            };
            vm.WarehouseItem=function(RefundCase){
                $state.go('warehouseitem', {casedata: RefundCase});
            };
            vm.SearchClick = function (clearGrid) {
                vm.GridInit('black', clearGrid);
                if (vm.Search != '') {
                    WarehouseSVC.SearchReturnedCase(vm.Search).success(function (data) {
                        if (data.length > 0) {
                            if (data.length == 1) {
                                if(data[0].RefundCaseStatus=="Label Generated"){
                                    data[0].RefundCaseStatus=vm.StatusDropDownData[2];
                                    vm.StatusUpdate(data[0].RefundCase_Id,vm.StatusDropDownData[2]);
                                }
                                $state.go('warehouseitem', {casedata: data[0]});
                                //redirect to warehouse item handel page
                            } else {
                                vm.CasesGrid=data;
                            }

                        }
                        else {
                            vm.Search = '';
                            alert('Case Id Not Found');
                        }
                    });
                }
            };
            vm.Back = function () {
                Back($state);
            };
            vm.UpdateStatusCase = function (caseID) {
                var combo = $("<select class='form-control' id='updateCaseStatus'></select>");
                $.each(vm.StatusDropDownData, function (i, el) {
                    combo.append("<option id=" + i + ">" + el + "</option>");
                });
                var btn = $('<input/>').attr({
                    type: "button",
                    value: "Submit",
                    style: 'margin-top:2%',
                    class: 'btn btn-danger updateCaseStatus'
                });
                $(document).off('click').on('click', '.updateCaseStatus', function () {
                    vm.StatusUpdate(caseID, $('#updateCaseStatus').children(":selected").val());
                });
                $('<div id="updateCaseStatusDiv" />').html(combo).append(btn).dialog({
                    width: 700,
                    title: 'Select Role For User'
                });
            };
            vm.StatusUpdate = function (caseID, status) {
                var StatusObject = {};
                StatusObject.RefundCase_Id = caseID;
                StatusObject.RefundCaseStatus = status;
                $('#updateCaseStatusDiv').remove();
                WarehouseSVC.UpdateCaseHistory(caseID,user.name+'|'+status);
                WarehouseSVC.UpdateCaseStatus(StatusObject).success(function (data) {
                    vm.refresh();
                });
            };
            vm.EditCase = function (Data) {
                var detail = JSON.parse(Data.RefundCaseDetail);
                vm.EditFormData = detail;
                vm.EditFormData.Id = Data.RefundCase_Id;
                var editBox = $('#editDiv');
                editBox.dialog({width: 700, close: vm.refresh});
                editBox.dialog('open');
            };
            vm.SubmitEditedForm = function () {
                var id = vm.EditFormData.Id;
                /*Delete unwanted properties*/
                delete vm.EditFormData.Id;
                var editBox = $('#editDiv');
                editBox.dialog('destroy');
                WarehouseSVC.UpdateCaseData(id, vm.EditFormData).success(function (data) {
                    vm.refresh();
                });
            };
            vm.AddImage = function (id) {
                $state.go('upload', {casedId: id});
            };
            vm.ShowImages = function (id) {
                CommunicationSVC.GetAllImages(id).success(function (data) {
                    if (data.length > 0) {
                        var div = $("<div id='allimages'></div>");
                        $.each(data, function (i, el) {
                            div.append("<a target='_blank' href=" + el.Image_Path + "\\" + el.Image_Name + " ><img src=" + el.Image_Path + "\\" + el.Image_Name + " style='height: 60px;width: 60px;margin:10px;border:2px solid black;border-radius: 5px;' /></a>");
                        });
                        $('<div />').html(div).dialog();
                    }
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
(function () {

    'use strict';

    angular
        .module('RefundSystemApp')
        .controller('NotificationCtrl', ['$http', '$auth', '$rootScope', '$state', 'CommunicationSVC', 'ApiSVC', NotificationCtrl]);

    function NotificationCtrl($http, $auth, $rootScope, $state, CommunicationSVC, ApiSVC) {
        if (user && getCookie('Role') != null) {
            var vm = this;
            vm.NotificationsGrid = '';
            vm.Messages = '';
            vm.Role = getCookie('Role');
            vm.refresh = function () {
                vm.NotificationsGrid = '';
                CommunicationSVC.GetAllNotifications().success(function (notifications) {
                    if (notifications.length > 0) {
                        vm.NotificationsGrid = notifications;
                    }
                });
            };
            vm.refresh();
            //mark notification read
            vm.MarkRead = function (id) {
                CommunicationSVC.MarkReadNotification(id).success(function () {
                    vm.refresh();
                });
            };
            // mark notification unread
            vm.MarkUnRead = function (id) {
                CommunicationSVC.MarkUnReadNotification(id).success(function (notifications) {
                    vm.refresh();
                });
            };
            //forward notification to other user dialog
            vm.ForwardNotification = function (id) {
                ApiSVC.GetAllWarehouseUsers().success(function (data) {
                    vm.AllSellers = data;
                    var combo = $("<select class='form-control' id='allWarehouse'></select>");
                    $.each(vm.AllSellers, function (i, el) {
                        combo.append("<option id=" + el.id + ">" + el.name + "</option>");
                    });
                    var btn = $('<input/>').attr({
                        type: "button",
                        value: "Submit",
                        class: 'btn btn-danger notificationmessage'
                    });
                    $(document).off('click').on('click', '.notificationmessage', function () {
                        vm.SubmitFWDNotification($('#allWarehouse').children(":selected").attr("id"), id);
                    });
                    $('<div id="notificationmessageDiv" />').html(combo).append(btn).dialog({
                        width: 700,
                        title: 'forward to warehouse'
                    });
                });

            };
            //submit forwarded notification
            vm.SubmitFWDNotification = function (_TO, _ID) {
                var notification = {};
                notification.to_user_id = _TO;
                notification.id = _ID;
                ApiSVC.UpdateNotification(notification).success(function (data) {
                    $('#notificationmessageDiv').remove();
                    vm.refresh();
                });
            };
            //reply to the message
            vm.ReplyMessage = function (NotificationMessage) {

                var textArea = $('<textarea style="width: 600px; height: 200px;margin: 2%" class="msgText"/>');
                var btn = $('<input/>').attr({
                    type: "button",
                    value: "Submit",
                    class: 'btn btn-danger notificationmessage'
                });
                $(document).off('click').on('click', '.notificationmessage', function () {
                    vm.SubmitRelpyNotification(NotificationMessage, user.id, $('.msgText').val());
                });
                $('<div id="notificationmessageDiv" />').html(textArea).append(btn).dialog({
                    width: 700,
                    title: 'Reply'
                });

            };
            //show all chain messages
            vm.MessageChain = function (id) {
                vm.Messages = '';
                CommunicationSVC.GetMessageChain(id).success(function (notifications) {
                    vm.Messages = notifications;
                    $('#messageDiv').dialog({width: 400, title: 'Messages', height: 500, overflow: "auto"});
                    $('#messageDiv').dialog('open');

                });
            };
            //submit notification
            vm.SubmitRelpyNotification = function (NotificationMessage, _FROM, _Message) {

                var notification = {};
                notification.parent_id = NotificationMessage.Id;
                notification.to_user_id = NotificationMessage.ReplyBackTo;
                notification.from_user_id = _FROM;
                notification.notificationMsg = _Message;
                CommunicationSVC.ReplyNotification(notification).success(function (data) {
                    $('#notificationmessageDiv').remove();
                    vm.refresh();
                });
            };
            vm.Back = function () {
                Back($state);
            };
            vm.logout = function () {
                Logout($auth, $rootScope, $state);
            };
        } else {
            Logout($auth, $rootScope, $state);
        }

    }
})();

(function () {
    'use strict';
    angular
        .module('RefundSystemApp')
        .controller('WarehouseItemCtrl', ['$http', '$document', '$scope', '$stateParams', '$state', '$auth', 'WarehouseSVC', function ($http, $document, $scope, $stateParams, $state, $auth, WarehouseSVC) {
            if (user && getCookie('Role') != null) {
                var vm = this;
                vm.CaseID = $stateParams.casedata.RefundCase_Id;
                vm.CaseDetails = JSON.parse($stateParams.casedata.RefundCaseDetail);
                $http.get(configuration.path + '/item_status_action').success(function (data) {
                    vm.status_action = data;
                });
                WarehouseSVC.GetHistory(vm.CaseID).success(function (data) {
                    vm.history = data;
                });
                //Case Satus options
                vm.StatusDropDownData = {
                    "1": 'Label Generated',
                    "2": 'In Warehouse',
                    "3": 'In Process',
                    "4": 'Rejected|Closed',
                    "5": 'Passed|Closed'
                };
                // keyboard key handler
                vm.KeyHandler = function (event) {
                    switch (event.keyCode) {
                        case 112:
                            vm.StatusUpdate(vm.CaseID, vm.StatusDropDownData[5]);
                            break;
                        case 113:
                            vm.StatusUpdate(vm.CaseID, vm.StatusDropDownData[3]);
                            break;
                        case 114:
                            vm.StatusUpdate(vm.CaseID, vm.StatusDropDownData[4]);
                            break;
                        case 115:
                            vm.UpdateWarehouseStatusAction(vm.CaseID);
                            break;

                    }
                };
                vm.UpdateWarehouseStatusAction = function (caseID, refundCaseStatus) {
                    var combo = $("<select class='form-control' id='status_action'></select>");
                    $.each(vm.status_action, function (i, el) {
                        combo.append("<option id=" + el.statusaction_Id + ">" + el.status + '|' + el.action + "</option>");
                    });
                    var btn = $('<input/>').attr({
                        type: "button",
                        value: "Submit",
                        style: 'margin-top:5px',
                        class: 'btn btn-danger status_action'
                    });
                    $(document).off('click').on('click', '.status_action', function () {
                        vm.SubmitWarehouseStatusAction($('#status_action').children(":selected").text(), caseID, refundCaseStatus);
                    });
                    $('<div id="status_actionDiv" />').html(combo).append(btn).dialog({
                        width: 700,
                        title: 'Update Status'
                    });
                };
                vm.SubmitWarehouseStatusAction = function (status_action, caseID, status) {
                    $('#status_actionDiv').remove();
                    vm.CaseDetails.warehouse_status_action = status_action;
                    WarehouseSVC.UpdateCaseHistory(caseID, user.name + '|' + status_action);
                    WarehouseSVC.UpdateCaseData(caseID, vm.CaseDetails).success(function (data) {
                        if (status) {
                            vm.StatusUpdate(caseID, status);
                        }
                    });
                };
                $document.unbind('keyup').bind('keyup', vm.KeyHandler);
                vm.StatusUpdate = function (caseID, status) {
                    if (vm.CaseDetails.warehouse_status_action != undefined) {
                        var StatusObject = {};
                        StatusObject.RefundCase_Id = caseID;
                        StatusObject.RefundCaseStatus = status;
                        WarehouseSVC.UpdateCaseHistory(caseID, user.name + '|' + status);
                        WarehouseSVC.UpdateCaseStatus(StatusObject).success(function (data) {
                            vm.BackToWarehouse();
                        });
                    } else {
                        vm.UpdateWarehouseStatusAction(caseID, status);
                    }
                };
                vm.BackToWarehouse = function () {
                    $state.go('warehouse');
                };
                vm.logout = function () {
                    Logout($auth, $rootScope, $state);
                };
            } else {
                Logout($auth, $rootScope, $state);
            }

        }]);
})();
(function () {

    'use strict';
    angular
        .module('RefundSystemApp')
        .factory('ApiSVC', ['$http', '$auth', function ($http, $auth) {
            var factory = {};
            factory.GetAllWarehouseUsers = function () {
                return $http.get(configuration.path + '/api/AllWarehouseUsers' + '?token=' + $auth.getToken());

            };
            factory.UpdateNotification = function (notification) {
                return $http.post(configuration.path + '/api/UpdateNotification' + '?token=' + $auth.getToken(), JSON.stringify(notification));
            };
            factory.GetAuthenticatedUser = function () {
                return $http.get(configuration.path + '/api/authenticate/user' + '?token=' + $auth.getToken());
            };
            factory.GetRole = function () {
                return $http.get(configuration.path + '/api/GetRole' + '?token=' + $auth.getToken());
            };
            factory.GetAllUsers = function () {
                return $http.get(configuration.path + '/api/Users' + '?token=' + $auth.getToken());
            };
            factory.UpdateUser = function (data) {
                return $http.post(configuration.path + '/api/UpdateUser' + '?token=' + $auth.getToken(), JSON.stringify(data));
            };
            factory.CreateUser = function (data) {
                return $http.post(configuration.path + '/api/CreateUser' + '?token=' + $auth.getToken(), JSON.stringify(data));
            };
            factory.GetAllRoles = function () {
                return $http.get(configuration.path + '/api/Roles' + '?token=' + $auth.getToken());
            };
            factory.AssignRole = function (userData) {
                return $http.post(configuration.path + '/api/AssignRole' + '?token=' + $auth.getToken(), JSON.stringify(userData));
            };
            factory.DeleteUser = function (id) {
                return $http.get(configuration.path + '/api/DeleteUser/' + id + '?token=' + $auth.getToken());
            };
            factory.GetAllCases = function () {
                return $http.get(configuration.path + '/api/AllCases' + '?token=' + $auth.getToken());
            };
            return factory;
        }]);
})();
(function () {

    'use strict';
    angular
        .module('RefundSystemApp')
        .factory('CommunicationSVC', ['$http', '$auth', function ($http, $auth) {
            var factory = {};
            factory.GetAllNotifications = function () {
                return $http.get(configuration.path + '/Communication/GetAllNotifications/' + user.id + '?token=' + $auth.getToken());
            };
            factory.MarkReadNotification = function (id) {
                return $http.get(configuration.path + '/Communication/MarkRead/' + id + '?token=' + $auth.getToken());
            };
            factory.MarkUnReadNotification = function (id) {
                return $http.get(configuration.path + '/Communication/MarkUnRead/' + id + '?token=' + $auth.getToken());
            };
            factory.GetMessageChain = function (id) {
                return $http.get(configuration.path + '/Communication/GetChainNotifications/' + id + '?token=' + $auth.getToken());
            };
            factory.ReplyNotification = function (notification) {
                return $http.post(configuration.path + '/Communication/ReplyNotification' + '?token=' + $auth.getToken(), JSON.stringify(notification));
            };
            factory.FileUplod = function (id) {
                return configuration.path + '/Communication/File/Upload/' + id + '?token=' + $auth.getToken();
            };
            factory.GetNotificationCount = function () {
                return $http.get(configuration.path + '/Communication/GetNotificationCount/' + user.id + '?token=' + $auth.getToken());
            };
            factory.GetTopFiveNotification = function () {
                return $http.get(configuration.path + '/Communication/GetTopFiveNotifications/' + user.id + '?token=' + $auth.getToken());
            };
            factory.MarkAllNotificationRead = function () {
                return $http.get(configuration.path + '/Communication/MarkAllNotificationRead/' + user.id + '?token=' + $auth.getToken());
            };
            factory.GetAllMessages = function (id) {
                return $http.get(configuration.path + '/Communication/GetAllMessage/' + id + '?token=' + $auth.getToken());
            };
            factory.GetAllImages = function (id) {
                return $http.get(configuration.path + '/Communication/File/GetAllImages/' + id + '?token=' + $auth.getToken());
            };
            factory.SendNotification = function (notification) {
                return $http.post(configuration.path + '/Communication/SendNotification' + '?token=' + $auth.getToken(), JSON.stringify(notification))
            };
            factory.AddMessage = function (message) {
                return $http.post(configuration.path + '/Communication/AddMessage' + '?token=' + $auth.getToken(), JSON.stringify(message));
            };
            return factory;
        }]);
})();
(function () {

    'use strict';
    angular
        .module('RefundSystemApp')
        .factory('SellerSVC', ['$http', '$auth', function ($http, $auth) {
            var factory = {};

            factory.GenerateRefundLink = function (data) {
                return $http.post(configuration.path + '/Seller/GenerateRefundLink' + '?token=' + $auth.getToken(), JSON.stringify(data));
            };
            factory.GetAllSellerCase = function () {
                return $http.get(configuration.path + '/Seller/AllCases/' + user.id + '?token=' + $auth.getToken());
            };
            factory.UpdateCaseData = function (id, data) {
                return $http.post(configuration.path + '/Seller/UpdateCaseData/' + id + '?token=' + $auth.getToken(), JSON.stringify(data))
            };
            factory.GetLink = function (id) {
                return $http.get(configuration.path + '/Seller/GetLink/' + id + '?token=' + $auth.getToken());
            };
            factory.DeleteCase = function (id) {
                return $http.get(configuration.path + '/Seller/DeleteCase/' + id + '?token=' + $auth.getToken());
            };
            factory.GetAllAdmins = function () {
                return $http.get(configuration.path + '/Seller/GetAllAdmins' + '?token=' + $auth.getToken());
            };
            factory.MailLink = function (id) {
                return $http.get(configuration.path + '/Seller/MailLink/' + id + '?token=' + $auth.getToken());
            };
            return factory;
        }]);
})();
(function () {

    'use strict';
    angular
        .module('RefundSystemApp')
        .factory('WarehouseSVC', ['$http', '$auth', function ($http, $auth) {
            var factory = {};


            factory.GetAllSellers = function () {
                return $http.get(configuration.path + '/Warehouse/GetAllSellers' + '?token=' + $auth.getToken());
            };
            factory.SearchReturnedCase = function (Search) {
                return $http.get(configuration.path + '/Warehouse/ReturnedCase/' + Search + '?token=' + $auth.getToken());
            };
            factory.UpdateCaseStatus = function (Status) {
                return $http.post(configuration.path + '/Warehouse/UpdateCaseStatus' + '?token=' + $auth.getToken(), JSON.stringify(Status));
            };
            factory.UpdateCaseData = function (id, data) {
                return $http.post(configuration.path + '/Warehouse/UpdateCaseData/' + id + '?token=' + $auth.getToken(), JSON.stringify(data));
            };
            factory.GetAllBufferCases=function () {
                return $http.get(configuration.path + '/Warehouse/AllBufferCases' + '?token=' + $auth.getToken());
            };
            factory.GetAllForecastCases=function () {
                return $http.get(configuration.path + '/Warehouse/AllForecastCases' + '?token=' + $auth.getToken());
            };
            factory.GetAllArchivedCases=function () {
                return $http.get(configuration.path + '/Warehouse/AllArchivedCases' + '?token=' + $auth.getToken());
            };
            factory.UpdateCaseHistory=function (id, message) {
                return $http.get(configuration.path + '/Warehouse/UpdateCaseHistory/' + id +'/'+message+ '?token=' + $auth.getToken());
            };
            factory.GetHistory=function (id) {
                return $http.get(configuration.path + '/Warehouse/GetHistory/' + id + '?token=' + $auth.getToken());
            };
            return factory;
        }]);
})();
//# sourceMappingURL=User.js.map
