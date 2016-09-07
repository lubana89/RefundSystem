(function() {

    'use strict';
    angular
        .module('RefundSystemApp')
        .controller('UploaderCntrl', ['$scope', 'FileUploader','$stateParams','$state','$auth','CommunicationSVC', function($scope, FileUploader,$stateParams,$state,$auth,CommunicationSVC) {
            $scope.Back=function () {
                Back($state);
            };
            var uploader = $scope.uploader = new FileUploader({
                url:    CommunicationSVC.FileUplod($stateParams.casedId)
            });

            // FILTERS
            uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            // CALLBACKS
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                uploader.removeFromQueue(fileItem);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };

        }]);
})();
//# sourceMappingURL=Uploader.js.map
