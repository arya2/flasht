(function () {
    'use-strict';

    angular
        .module('flasht.core')
        .config(configure);

    configure.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configure($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "app/components/home/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            });
    }

})();