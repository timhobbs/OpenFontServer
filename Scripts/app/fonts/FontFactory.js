(function (module) {
    "use strict";

    function FontFactory($http) {
        var currentPage = 1, pageSize = 25;

        function _setGridState(cp, ps) {
            currentPage = cp;
            pageSize = ps;
        }

        function _getGridState() {
            return {
                currentPage: currentPage,
                pageSize: pageSize
            };
        }

        function _getFonts(qs) {
            return $http.get("/api/fonts", qs);
        }

        function _getSearch(data) {
            return $http.get("/api/search", data);
        }

        function _getFont(id) {
            return $http.get("/api/fonts", { params: { id: id } });
        }

        return {
            getFonts: _getFonts,
            setGridState: _setGridState,
            getGridState: _getGridState,
            getSearch: _getSearch,
            getFont: _getFont
        };
    }

    module.factory("FontFactory", ["$http", FontFactory]);

})(angular.module("app"));