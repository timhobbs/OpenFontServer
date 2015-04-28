(function () {
    "use strict";

    function appConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "/pages/home.html"
            })
            .state("about", {
                url: "/about",
                templateUrl: "/pages/about.html"
            })
            .state("search", {
                url: "/search?term",
                templateUrl: "/pages/fonts.html",
                controller: "FontsCtrl as fonts"
            })
            .state("fonts", {
                url: "/fonts",
                templateUrl: "/pages/fonts.html",
                controller: "FontsCtrl as fonts"
            })
            .state("fontDetail", {
                url: "/fonts/:id",
                templateUrl: "/pages/fontDetail.html",
                controller: "FontDetailCtrl as font"
            })
            .state("admin", {
                url: "/admin",
                templateUrl: "/pages/admin.html",
                controller: "AdminCtrl as admin",
                redirectTo: "admin.addfont"
            })
            .state("admin.addfont", {
                url: "/addfont",
                templateUrl: "/pages/admin.addfont.html",
                controller: "AddFontCtrl as add"
            })
            .state("admin.extract", {
                url: "/extract",
                templateUrl: "/pages/admin.extract.html",
                controller: "ExtractCtrl as extract"
            });

        //https://github.com/chieffancypants/angular-loading-bar
        //cfpLoadingBarProvider.includeSpinner = true;
        //cfpLoadingBarProvider.includeBar = false;
        //cfpLoadingBarProvider.latencyThreshold = 500;
    }

    angular.module("app", ["ui.router", "ngGrid", "angular-loading-bar", "ngAnimate"])
        .config(["$stateProvider", "$urlRouterProvider", appConfig])
        .run(["$rootScope", "$state", function ($rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function(evt, to, params) {
                if (to.redirectTo) {
                    evt.preventDefault();
                    $state.go(to.redirectTo, params);
                }
            });
        }]);
})();