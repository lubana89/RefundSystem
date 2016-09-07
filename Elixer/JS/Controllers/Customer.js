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
            window.location.href = configuration.path + '/QR';
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
//# sourceMappingURL=Customer.js.map
