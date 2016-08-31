var app = angular.module('Customer', []);
app.controller('CustomerRefundCtrl', function ($scope, $http) {
    $scope.reasons = [];
    $scope.wishes = [];
    $scope.conditions = [];
    $http.get(configuration.path+'/wish').success(function(data){
        $.each(data, function(index) {
            $scope.wishes.push(data[index].Wish);
        });
    });
    $http.get(configuration.path+'/reason').success(function(data){
        $.each(data, function(index) {
            $scope.reasons.push(data[index].Reason);
        });
    });
    $http.get(configuration.path+'/itemCondition').success(function(data){
        $.each(data, function(index) {
            $scope.conditions.push(data[index].ItemCondition);
        });
    });
    $http.get($(location).attr('href')+'/Fetch').success(function(data){
             $scope.form =data;
    });
    $scope.SubmitForm = function() {
        $http.post(configuration.path+'/UpdateCaseData', JSON.stringify($scope.form)).success(function(data){
            window.location.href = configuration.path+'/QR';
        });
    };
});
//# sourceMappingURL=Customer.js.map
