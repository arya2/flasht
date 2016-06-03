(funtion() {
    'use strict';

    angular
        .module('flasht.core')
        .factory('Auth', Auth);

    Auth.$inject = ['fref', '$firebaseAuth']

    function Auth(fref, $firebaseAuth) {
        return $firebaseAuth(fref);
    }

})();