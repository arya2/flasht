(function () {
    'use strict';

    angular.module('flasht.core').run(run);

    run.$inject = ['$state'];

    function run($state) {
        var config = {
            apiKey: "AIzaSyB-0HLG0XT49vRTmUikcFuzveXkaRS7Xbc",
            authDomain: "flasht.firebaseapp.com",
            databaseURL: "https://flasht.firebaseio.com",
            storageBucket: "project-2366391200623723905.appspot.com",
        };
        firebase.initializeApp(config);
        $state.transitionTo('home');
    }

})();