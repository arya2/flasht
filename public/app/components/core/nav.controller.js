(function () {

    'use strict';

    angular
        .module('flasht.core')
        .controller('NavController', NavController);


    NavController.$inject = ["Auth"]

    function NavController(Auth) {
        var nav = this;
        nav.signin = Auth.signin;
        nav.signout = Auth.signout;

        Auth.diff(nav);

    }

})();