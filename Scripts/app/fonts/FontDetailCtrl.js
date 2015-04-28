(function (module) {
    "use strict";

    function FontDetailCtrl($stateParams, FontFactory, $http) {
        /* jshint validthis:true */
        var vm = this;
        var st = "The quick brown fox jumps over the lazy dog. 1234567890";
        vm.sizes = ["12", "18", "24", "36", "48", "60", "72"];
        vm.sampleText = st;

        vm.reset = function () {
            vm.sampleText = st;
            vm.sampleForm.$setPristine();
        };

        vm.download = function () {
            var url = "/handlers/file.ashx?f=" + vm.path + "&dl=true";
            console.info("url", url);
            location.href = url;
        };

        vm.createImage = function() {
            $http.post("/api/image", vm.Id).then(function (res) {
                console.info("res: /api/image post", res, vm);
            }, function (res) {
                console.error("err", res);
            });
        };

        init($stateParams.id);

        function init(id) {
            FontFactory.getFont(id).then(function(res) {
                console.info("res", res);
                for (var item in res.data) {
                    vm[item] = res.data[item];
                }
                vm.path = encodeURIComponent(vm.FilePath);
            }, function (res) {
                console.error("err", res);
            });
        }
    }

    module.controller("FontDetailCtrl", ["$stateParams", "FontFactory", "$http", FontDetailCtrl]);

})(angular.module("app"));
