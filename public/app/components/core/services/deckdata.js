(function () {
    'use strict';

    angular
        .module('flasht.core')
        .factory('DeckData', DeckData);

    DeckData.$inject = ["fref", "$firebaseObject", "$log"];

    function DeckData(fref, $firebaseObject, $log) {
        var DeckData = this;

        var registeredControllers = [];

        DeckData.dataObj = null;
        DeckData.load = load;
        DeckData.unload = unload;
        DeckData.getDecks = getDecks;
        DeckData.pushDeck = pushDeck;

        function load(uid) {
            if (DeckData.dataObj == null) {
                $log.info("DeckData: loading deck data for uid " + uid);
                DeckData.dataObj = $firebaseObject(fref.child(uid).child("deckdata"));
                DeckData.dataObj.$loaded().then(updateDecks);
            }

            function updateDecks() {
                var d = DeckData.dataObj;

                if (!d.decks) d.decks = [];

                registeredControllers.map(function (vm) {
                    vm.decks = d.decks;
                });
            }
        }

        function unload() {
            $log.info("DeckData: unloading deck data");
            DeckData.dataObj = null;
        }

        function getDecks(vm) {
            registeredControllers.push(vm);
        }

        function pushDeck(deck) {
            var d = DeckData.dataObj;
            $log.info("DeckData: pushing deck " + JSON.stringify(deck));
            if (d && d.decks) {
                d.decks.push(deck);
                d.$save();
            }
        }

        return DeckData;
    }

})();