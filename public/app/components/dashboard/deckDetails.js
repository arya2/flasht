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

        function cardsDue() {
            if (!vm.cards) return 0;
            return vm.cards.filter(function(card) {
                return card.recollection_length == 'first' || (card.recollection_length + card.recollection_date < Date.now());
            }).length;
        }

    }

})();
