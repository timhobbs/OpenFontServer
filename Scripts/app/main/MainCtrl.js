(function (module) {
    "use strict";

    function MainCtrl($state) {
        /* jshint validthis:true */
        var vm = this;
        vm.search = function (term) {
            vm.searchTerm = "";
            $state.go("search", { term: term });
        };
    }

    module.controller("MainCtrl", ["$state", MainCtrl]);

})(angular.module("app"));
