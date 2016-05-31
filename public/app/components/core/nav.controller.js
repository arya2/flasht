(function () {

    'use strict';

    angular
        .module('flasht')
        .controller('NavController', NavController);

    function NavController() {
        var nav = this;

        nav.hello = 'hello';

    }

})();