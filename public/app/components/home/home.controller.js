(function () {
    'use strict';

    angular
        .module('flasht')
        .controller('HomeController', homeController);

    homeController.$inject = ["$log", "Auth", "UserData", "DeckData"];

    function homeController($log, Auth, UserData, DeckData) {
        var vm = this;
        Auth.diff(vm);
        UserData.getUserData(vm);

        vm.signin = Auth.signin;
        vm.createDeck = createDeck;
        vm.noDecks = noDecks;

        function noDecks() {
            return (!!vm.user && vm.userdata);
        }

        function createDeck() {
            DeckData.pushDeck({
                name: vm.newDeck
            });
        }
    }

})();