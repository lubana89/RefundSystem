(function() {

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