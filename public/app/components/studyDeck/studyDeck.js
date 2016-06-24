(function() {
    'use strict';

    angular
        .module('flasht')
        .controller('studyDeckController', studyDeckController);

    studyDeckController.$inject = ["user", "$firebaseArray", "fref", "$stateParams"];

    function studyDeckController(user, $firebaseArray, fref, $stateParams) {
        var vm = this;

        vm.deckcards = $firebaseArray(fref.child(user.uid).child('cards').child($stateParams.deck));

        vm.deckcards.$loaded(loadQuestion);

        function loadQuestion() {
            vm.question = vm.deck.cards[0];
            // .filter(c => {
            //     c.due < Date.now()
            // }).reduce((p, n) => {
            //     p.due > n.due ? n : p
            // });
        }
    }

})();
