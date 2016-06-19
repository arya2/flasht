(function () {
    'use strict';

    angular
        .module('flasht')
        .controller('HomeController', homeController);

    homeController.$inject = ["currentAuth", "$log", "Auth", "$firebaseArray", "fref"];

    function homeController(currentAuth, $log, Auth, $firebaseArray, fref) {
        var vm = this;
        vm.user = currentAuth;
        vm.signin = signin;

        if (vm.user && vm.user.uid) getData();

        function getData(d) {
            vm.decks = $firebaseArray(fref.child((d && d.user.uid) || vm.user.uid).child("decks"));
        }

        function signin() {
            vm.user = Auth.$signInWithPopup("google").then(getData);
        }
    }
})();