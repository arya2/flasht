(function() {
    'use strict';

    angular
        .module('flasht')
        .controller('studyDeckController', studyDeckController);

    studyDeckController.$inject = ["user", "$firebaseArray", "fref", "$stateParams"];

    function studyDeckController(user, $firebaseArray, fref, $stateParams) {
        var vm = this;
        vm.cards = $firebaseArray(fref.child(user.uid).child('cards').child($stateParams.deck));
        vm.cards.$loaded(loadCard);
        vm.solved = solved;
        vm.flip = () => vm.currentCard.flipped = true;

        let difficulty = {
            hard: 1.2,
            moderate: 1.5,
            easy: 2,
            wrong: 0.3
        };

        function solved(rType, key) {
            let card = vm.cards.$getRecord(key);
            if (card.recollection_length == 'first') card.recollection_length = 36000000;
            card.recollection_length = card.recollection_length * difficulty[rType];
            card.recollection_date = Date.now();
            vm.cards.$save(card);
            loadCard();
        }

        function loadCard() {
            vm.currentCard = Object.assign({
                flipped: false
            }, vm.cards.filter((c) =>
                (c.recollection_length == 'first' || (c.recollection_date + c.recollection_length) < Date.now())
            )[0]);

            if (!vm.currentCard.$id) vm.done = true;
            else vm.done = false;

            console.log(vm.cards);
            console.log(vm.currentCard);
            // .filter(c => {
            //     c.due < Date.now()
            // }).reduce((p, n) => {
            //     p.due > n.due ? n : p
            // });
        }
    }

})();
