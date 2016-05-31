(function () {
    'use strict';

    angular
        .module('flasht.core')
        .factory('fref', fref);

    fref.$inject = ['firebase'];

    function fref() {
        var fref = {
            ref: ref
        };

        var ref = new Firebase("https:/flasht.firebaseio.com");
        return fref;
    }

})();