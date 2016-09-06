(function() {

    'use strict';

    angular
        .module('RefundSystemApp')
        .directive('message', function () {
        var directive = {};
        directive.template = '<div class="media-body"><span class="text-muted pull-right"><small class="text-muted">{{message.DateTime}}</small></span><strong class="text-success">@{{message.From_name}}</strong><p>{{message.Message}}</p></div><hr>';
        return directive;
    });
})();