(function() {
    'use strict';

    angular
        .module('flasht')
        .controller("DashboardDeckDetailsController", DashboardDeckDetailsController);

    DashboardDeckDetailsController.$inject = ["user", "$stateParams", "$firebaseObject", "$firebaseArray", "fref"];

    function DashboardDeckDetailsController(user, $stateParams, $firebaseObject, $firebaseArray, fref) {
        var vm = this;
        vm.deck = $firebaseObject(fref.child(user.uid).child('decks').child($stateParams.deck));
        vm.cards = $firebaseArray(fref.child(user.uid).child('cards').child($stateParams.deck));
        vm.cardsDue = cardsDue;
        vm.totalCards = totalCards;

        function cardsDue() {
            if (!vm.deck.cards) return 0;
            return Object.keys(vm.deck.cards).map(key => vm.deck.cards[key]).filter(function(card) {
                if (!card.due) return true;
                return (new Date(card.due)) < Date.now();
            }).length;
        }

        function totalCards() {
            if (!vm.deck.cards) return 0;
            return Object.keys(vm.deck.cards).length;
        }
    }

})();
