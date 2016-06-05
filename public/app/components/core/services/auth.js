(function () {
    'use strict';

    angular
        .module('flasht.core')
        .factory('Auth', Auth);

    Auth.$inject = ['$firebaseAuth', '$log', 'UserData', 'DeckData'];

    function Auth($firebaseAuth, $log, UserData, DeckData) {
        $log.info("Auth: creating Auth object");

        var obj = $firebaseAuth();
        var Auth = this;
        Auth.signin = signin;
        Auth.signout = signout;
        Auth.diff = diff;

        function signin() {
            $log.info("Auth: signing in");
            obj.$signInWithPopup("google");
        }

        function signout() {
            $log.info("Auth: signing out");
            obj.$signOut();
        }

        function diff(vm) {
            $log.info("Auth: passing setUser to auth watch");
            obj.$onAuthStateChanged(setUser.bind(vm));
        }

        function setUser(authData) {
            $log.info("Auth: updating user value of ", this);
            if (authData && authData.providerData) {
                this.user = authData.providerData[0];
                UserData.loadUserData(this.user);
                DeckData.load(this.user.uid);
            }
            if (!authData) {
                this.user = null;
                UserData.unloadUserData();
                DeckData.unload();
            }
        }

        return Auth;
    }

})();