(function() {
    'use strict';

    angular
        .module('flasht')
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["decks", "$state"];

    function DashboardController(decks, $state) {
        var vm = this;
        vm.decks = decks;
        vm.removeDeck = vm.decks.$remove;
        decks.$loaded().then(function() {
            if (decks.length) $state.go("dashboard.deck", {
                deck: vm.decks[0].$id
            });
        });


        vm.done = done;

        function done(deck) {
            if (!deck.date) return false;
            return ((new Date(deck.due)) > Date.now());
        }
    }

})();
