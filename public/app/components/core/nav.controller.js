(function () {

    'use strict';

    angular
        .module('flasht.core')
        .controller('NavController', NavController);


    NavController.$inject = ["Auth", "$state"]

    function NavController(Auth, $state) {
        var nav = this;
        nav.user = Auth.$getAuth();
        nav.signin = signin;
        nav.signout = signOut;

        function signOut() {
            Auth.$signOut();
            $state.go('home');
        }

        Auth.$onAuthStateChanged((u) => nav.user = u);

        function signin() {
            nav.user = Auth.$signInWithPopup("google");
        }
    }

})();