(function() {
    'use strict';

    angular
        .module('flasht')
        .controller('ManageDeckController', ManageDeckController);

    ManageDeckController.$inject = ["currentAuth", "fref", "$firebaseArray", "Auth", "$location", "$state", "$window", "$document"];

    function ManageDeckController(currentAuth, fref, $firebaseArray, Auth, $location, $state, $window, $document) {
        var vm = this;
        vm.user = currentAuth;
        vm.createDeck = createDeck;
        vm.removeDeck = removeDeck;

        vm.decks = $firebaseArray(fref.child(vm.user.uid).child("decks"));

        function createDeck($event) {
            if ($event && $event.type == 'keypress' && event.keyCode != 13) return null;
            vm.decks.$add({
                created: Date.now(),
                name: vm.newDeck
            });
        }

        function removeDeck(deck) {
            if ($location.url().split('/')[2] === deck.$id) $state.go('manageDecks');
            vm.decks.$remove(deck);
        }

    }

})();
