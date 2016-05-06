(function(){
    'use-strict';    
    
    angular
        .module('flasht.core')
        .config(configure);
    
    configure.$inject = ["$stateProvider", "$urlRouterProvider"];
    function configure($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");
        
        $stateProvider            
            .state('home', {
              url: "/home",
              templateUrl: "home/home.html"
            })
            .state('login', {
              url: "/login",
              templateUrl: "partials/login.html"
            })
            .state('dashboard', {
              url: "/dashboard",
              templateUrl: "partials/dashboard.html"
            });
    }
    
})();