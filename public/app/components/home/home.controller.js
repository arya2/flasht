(function () {
    'use-strict';

    angular
        .module('flasht')
        .controller('HomeController', homeController);

    homeController.$inject = ["$log", "fref"];

    function homeController($log, fref) {
        var vm = this;
        vm.login = login;

        function login() {
            $log.log("logged")
        }
    }



})();