(function () {
    'use-strict';

    angular
        .module('flasht')
        .controller('HomeController', homeController);

    homeController.$inject = ["$log", "fref", "Auth"];

    function homeController($log, fref, Auth) {
        var vm = this;
        vm.login = login;

        function login() {
            $log.log("logged");
            Auth.$authWithOAuthPopup("google").then(function (d) {
                $log.info(d)
            });
        }
    }



})();