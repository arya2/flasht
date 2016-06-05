(function () {
    'use strict';

    angular
        .module('flasht.core')
        .factory('DeckData', DeckData);

    DeckData.$inject = ["fref", "$firebaseArray", "$log"];

    function DeckData(fref, $firebaseArray, $log) {
        var DeckData = this;

        var registeredControllers = [];

        DeckData.dataObj = null;
        DeckData.load = load;
        DeckData.unload = unload;
        DeckData.getDecks = getDecks;

        function load(uid) {
            if (DeckData.dataObj == null) {
                $log.info("DeckData: loading deck data for uid " + uid);
                DeckData.dataObj = $firebaseArray(fref.child(uid).child("decks"));
                DeckData.dataObj.$loaded().then(updateDecks);
            }

            function updateDecks() {
                var d = DeckData.dataObj;
                registeredControllers.map(function (vm) {
                    vm.decks = d;
                    vm.selectedDeck = vm.decks[vm.decks.length - 1];
                });
            }
        }

        function unload() {
            $log.info("DeckData: unloading deck data");
            DeckData.dataObj;
        }

        function getDecks(vm) {
            registeredControllers.push(vm);
        }

        return DeckData;
    }

})();