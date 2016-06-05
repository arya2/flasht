(function () {
    'use strict';

    angular
        .module('flasht.core')
        .factory('fref', fref);

    fref.$inject = [];

    function fref() {
        return firebase.database().ref();
    }

})();