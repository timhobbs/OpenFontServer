(function (module) {
    "use strict";

    function AdminCtrl() {
        /* jshint validthis:true */
        var vm = this;
        vm.title = "";
    }

    module.controller("AdminCtrl", [AdminCtrl]);

})(angular.module("app"));
