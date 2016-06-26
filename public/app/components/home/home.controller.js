(function() {
    'use strict';

    angular
        .module('flasht')
        .controller('HomeController', homeController);

    homeController.$inject = ["currentAuth", "$log", "Auth", "$firebaseArray", "fref", "$state"];

    function homeController(currentAuth, $log, Auth, $firebaseArray, fref, $state) {
        var vm = this;
        vm.user = currentAuth;
        vm.signin = signin;

        if (vm.user && vm.user.uid) getData();

        function getData(d) {
            vm.decks = $firebaseArray(fref.child((d && d.user.uid) || vm.user.uid).child("decks"));
        }

        function signin() {
            vm.user = Auth.$signInWithPopup("google").then(function(d) {
                console.log('user' + d);
                $state.go('dashboard');
            });
        }
    }

})();
