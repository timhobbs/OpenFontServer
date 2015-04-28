(function (module) {
    "use strict";

    function AddFontCtrl($http) {
        /* jshint validthis:true */
        var vm = this;
        vm.form = {};

        vm.addFonts = function (path) {
            $http.post("/api/fonts", JSON.stringify(path)).then(function (res) {
                console.info("res: post /api/fonts", res);
                vm.alertType = "success";
                vm.alertMessage = res.data.count + " files processed.";
            }, function (res) {
                console.error("err", res);
                vm.alertType = "danger";
                vm.alertMessage = res.data.Message;
            });
        };
    }

    module.controller("AddFontCtrl", ["$http", AddFontCtrl]);

})(angular.module("app"));
