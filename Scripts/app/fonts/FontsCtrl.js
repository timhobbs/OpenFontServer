(function (module) {
    "use strict";

    function FontsCtrl(FontFactory, $scope, $stateParams) {
        var gridState = FontFactory.getGridState();
        /* jshint validthis:true */
        $scope.pagingOptions = {
            pageSizes: [25, 50, 100],
            pageSize: gridState.pageSize,
            currentPage: gridState.currentPage
        };

        var vm = this;
        vm.gridData = [];
        vm.gridOptions = {
            data: "fonts.gridData",
            columnDefs: [
                { field: "Name", displayName: "Name", cellTemplate: "/templates/fontGridNameLink.html" },
                { field: "FileName", displayName: "FileName" },
                { field: "DesignerName", displayName: "DesignerName" },
                { field: "DesignerUrl", displayName: "DesignerUrl", cellTemplate: "/templates/fontGridDesignerLink.html" }
            ],
            multiSelect: false,
            totalServerItems: "totalCount",
            pagingOptions: $scope.pagingOptions,
            enablePaging: true,
            showFooter: true,
        };

        $scope.$watch("pagingOptions", function (newVal, oldVal) {
            console.info("pagingOptions", newVal, oldVal);
            if (newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize)) {
                FontFactory.setGridState(newVal.currentPage, newVal.pageSize);
                init();
            }
        }, true);

        init();

        function init() {

            var term = $stateParams.term;
            if (term) {
                var data = {
                    params: {
                        searchTerm: term,
                        pageNumber: $scope.pagingOptions.currentPage,
                        pageSize: $scope.pagingOptions.pageSize
                    }
                };
                console.info("term", term, data);
                FontFactory.getSearch(data).then(function (res) {
                    console.info("res: get /search", res);
                    vm.gridData = res.data.list;
                    $scope.totalCount = res.data.total;
                });

            } else {
                var qs = {
                    params: {
                        pageNumber: $scope.pagingOptions.currentPage,
                        pageSize: $scope.pagingOptions.pageSize
                    }
                };
                console.info("no term", qs);
                FontFactory.getFonts(qs).then(function (res) {
                    console.info("res: get /api/fonts", res);
                    vm.gridData = res.data.list;
                    $scope.totalCount = res.data.total;
                });
            }
        }
    }

    module.controller("FontsCtrl", ["FontFactory", "$scope", "$stateParams", FontsCtrl]);

})(angular.module("app"));
