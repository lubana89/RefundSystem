var app = angular.module('Customer', []).directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'DD, d  MM, yy',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});
app.controller('CustomerRefundCtrl', ['$scope', '$http', function ($scope, $http) {
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
    $http.get($(location).attr('href') + '/Fetch').success(function (data) {
        $scope.form = data;
    });
    // on form submit generate qr code
    $scope.SubmitForm = function () {
        $http.post(configuration.path + '/UpdateCaseData', JSON.stringify($scope.form)).success(function (data) {
            // window.location.href = configuration.path + '/QR';
            window.location.href = configuration.path + '/BarCode';
        });
    };

    // upload image related to case
    $scope.SubmitImage = function () {
        var formData = new FormData();
        formData.append('file', $('#fileToUpload')[0].files[0]);
        $.ajax({
            url: configuration.path + '/File/Upload/' + 0,
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,

            success: function (data) {
                alert('image uploaded!');
            },
            error: function (e) {

            }
        });

    };
}]);
app.controller('CustomerRefundTrackCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    $scope.SubmitForm = function () {
        var trackID = $scope.getUrlParameter('trackID');
        var url = configuration.path + "/Status/";
        if (trackID != undefined)
            url += trackID;
        else
            url += $('.trackerID').val();
        window.location.href = url;


    };

    $scope.openDialog = function () {

        $('.dialogForm').show();
        $('.ui-widget-overlay').css('opacity', '0.3');
        $('.returnBtn').attr('disabled', true);
        $('.trackBtn').attr('disabled', true);
        $('.trackerID').attr('disabled', true);

    }

    $scope.close = function () {

        $('.dialogForm').hide();
        $('.ui-widget-overlay').css('opacity', '1');
        $('.returnBtn').attr('disabled', false);
        $('.trackBtn').attr('disabled', false);
        $('.trackerID').attr('disabled', false);
        $("input[name='sellerName']").val('');
        $("input[name='email']").val('');
        $("input[name='orderNr']").val('');
    }

    $scope.send = function () {
        var reqstcaseobj = {};
        reqstcaseobj.sellerName = $("input[name='sellerName']").val();
        reqstcaseobj.email = $("input[name='email']").val();
        reqstcaseobj.orderNr = $("input[name='orderNr']").val();
        if (reqstcaseobj.email != '') {
            $http.post(configuration.path + '/RequestCase', JSON.stringify(reqstcaseobj)).success(function (data) {
                $scope.close();
               alert(data);
            });
        }

    };

    $scope.init = function () {

        var trackID = $scope.getUrlParameter('trackID');
        $('.trackerID').val(trackID);
    };

}]);
//# sourceMappingURL=Customer.js.map
