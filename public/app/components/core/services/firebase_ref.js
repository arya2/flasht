(function () {
    'use strict';

    angular
        .module('flasht.core')
        .factory('fref', fref);

    fref.$inject = [];

    function fref() {
        var fref = {
            ref: ref
        };
        return fref;

        var ref = new Firebase("https:/flasht.firebaseio.com");
    }

})();