(function () {
    'use strict';

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
            })

        .state('manageDecks', {
            url: "/manageDecks",
            templateUrl: "app/components/manageDecks/manageDecks.html",
            controller: "DeckController",
            controllerAs: "vm"
        });
    }

})();