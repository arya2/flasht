(function() {
    'use strict';

    angular
        .module('flasht')
        .controller('studyDeckController', studyDeckController);

    studyDeckController.$inject = ["user"];

    function studyDeckController(user) {
        var vm = this;

        vm.question = "question";
    }

})();
