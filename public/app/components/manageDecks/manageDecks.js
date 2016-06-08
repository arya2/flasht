(function () {
    'use strict';

    angular
        .module('flasht')
        .controller('DeckController', DeckController);

    DeckController.$inject = ["fref", "Auth"];

    function DeckController(fref, Auth) {
        var vm = this;
        Auth.diff(vm);

        vm.decks = $firebaseArray(fref.child(vm.user.uid));
    }

})();