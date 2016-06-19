(function () {
    'use strict';

    angular
        .module('flasht.core')
        .factory('Auth', Auth);

    Auth.$inject = ["$firebaseAuth"];

    function Auth(f) {
        return f();
    }
})();