(function () {
    'use strict';

    angular
        .module('flasht.core')
        .factory('UserData', UserData);

    UserData.$inject = ["fref", "$firebaseObject", "$log"];

    function UserData(fref, $firebaseObject, $log) {
        var UserData = this;

        UserData.dataObj = null;
        UserData.loadUserData = loadUserData;
        UserData.unloadUserData = unloadUserData;
        UserData.getUserData = getUserData;

        var registeredControllers = [];

        function loadUserData(user) {
            if (UserData.dataObj == null) {
                $log.info("UserData: loading user data for " + user.uid);
                UserData.dataObj = $firebaseObject(fref.child(user.uid).child('account'));
                UserData.dataObj.$loaded().then(updateAccountInfo);
            }

            function updateAccountInfo() {
                var d = UserData.dataObj;
                if (!d.created_on) d.created_on = Date.now();
                d.last_visited = Date.now();
                d.profile = user;
                d.$save();
                registeredControllers.map(function (vm) {
                    vm.userdata = d;
                });
            }
        }

        function unloadUserData() {
            $log.info("UserData: unloading user data");
            UserData.dataObj = null;
        }

        function getUserData(vm) {
            registeredControllers.push(vm);
        }

        return UserData;
    }

})();