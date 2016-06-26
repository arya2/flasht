(function() {
    'use strict';

    angular
        .module('flasht')
        .controller('DeckController', DeckController);

    DeckController.$inject = ["cards"];

    function DeckController(cards) {
        var vm = this;
        vm.cards = cards;
        vm.newCard = {};
        vm.createCard = createCard;
        vm.removeCard = vm.cards.$remove;

        function createCard($event) {
            if ($event && $event.type == 'keypress' && event.keyCode != 13) return null;
            vm.cards.$add(Object.assign({
                cleared: false,
                created: Date.now(),
                recollection_length: 'first'
            }, vm.newCard));
            vm.newCard = {};
        }
    }

})();
