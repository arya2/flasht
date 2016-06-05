(function () {
    'use strict';

    angular
        .module('flasht')
        .controller('HomeController', homeController);

    homeController.$inject = ["$log", "Auth", "UserData", "DeckData", "$firebaseArray"];

    function homeController($log, Auth, UserData, DeckData, $firebaseArray) {
        var vm = this;
        Auth.diff(vm);
        UserData.getUserData(vm);
        DeckData.getDecks(vm);

        vm.signin = Auth.signin;
        vm.createDeck = createDeck;
        vm.addCard = addCard;
        vm.numDecks = numDecks;
        vm.selectDeck = selectDeck;

        function numDecks(n) {
            return (!!vm.user && vm.userdata && vm.decks && (vm.decks.length == n));
        }

        function createDeck($event) {
            if (($event.type == 'keypress' && $event.keyCode == 13) || ($event.type == 'click')) {
                vm.decks.$add({
                    name: vm.newDeck
                }).then(function () {
                    vm.selectedDeck = vm.decks[vm.decks.length - 1];
                });
                vm.newDeck = "";
            }
        }

        function addCard($event) {
            if (($event.type == 'keypress' && $event.keyCode == 13) || ($event.type == 'click')) {

            }
        }

        function selectDeck(id) {
            vm.selectedDeck = vm.decks.$getRecord(id);
        }
    }

})();