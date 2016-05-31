(function(){
    'use-strict';
    
    angular.module('flasht.core').run(run);
    
    run.$inject = ['$state'];
    function run($state){
        $state.transitionTo('home');
    }
    
})();