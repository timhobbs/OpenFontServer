(function (module) {
    "use strict";

    function ExtractCtrl($http) {
        /* jshint validthis:true */
        var vm = this;
        vm.form = {};

        vm.extractFonts = function () {
            var data = {
                sourcePath: vm.form.extractPath,
                destinationPath: vm.form.destinationPath,
                processedPath: vm.form.processedPath,
                moveExtractedArchives: vm.form.moveArchives
            };
            $http.post("/api/extract", data).then(function (res) {
                console.info("res: post /api/extract", res);
                vm.alertType = "success";
                vm.alertMessage = res.data.count + " files processed.";
            }, function (res) {
                console.error("err", res);
                vm.alertType = "danger";
                vm.alertMessage = res.data.Message;
            });
        };

        vm.dismiss = function () {
            vm.alertType = "";
        };
    }

    module.controller("ExtractCtrl", ["$http", ExtractCtrl]);

})(angular.module("app"));
