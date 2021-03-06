(function() {
    'use strict';

    angular
        .module('flasht.core')
        .config(configure);

    configure.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configure($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "app/components/home/home.html",
                controller: "HomeController",
                controllerAs: "vm",
                resolve: {
                    "currentAuth": ["Auth", "$state", function(Auth, $state) {
                        return Auth.$waitForSignIn().then(function(d) {
                            if (d) $state.go('dashboard');
                        })
                    }]
                }
            })
            .state('manageDecks', {
                url: "/manageDecks",
                templateUrl: "app/components/manageDecks/manageDecks.html",
                controller: "ManageDeckController",
                controllerAs: "vm",
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$requireSignIn();
                    }]
                }
            })
            .state('manageDecks.deck', {
                url: "/:deck",
                templateUrl: "app/components/manageDecks/deck.html",
                controller: "DeckController",
                controllerAs: "vm",
                resolve: {
                    "cards": ["Auth", "$firebaseArray", "fref", "$stateParams", "$state", function(Auth, $firebaseArray, fref, $stateParams, $state) {
                        if (Auth.$getAuth()) {
                            return $firebaseArray(fref.child(Auth.$getAuth().uid).child('cards').child($stateParams.deck)).$loaded();
                        }
                        return Auth.$requireSignIn().then(function(d) {
                            return $firebaseArray(fref.child(Auth.$getAuth().uid).child('cards').child($stateParams.deck)).$loaded();
                        }).catch(function(e) {
                            $state.go('home');
                        });
                    }]
                }
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "app/components/dashboard/dashboard.html",
                controller: "DashboardController",
                controllerAs: "vm",
                resolve: {
                    "decks": ["Auth", "fref", "$firebaseArray", "$state", function(Auth, fref, $firebaseArray, $state) {
                        return Auth.$requireSignIn().then(function(d) {
                            return $firebaseArray(fref.child(Auth.$getAuth().uid).child('decks'));
                        }).catch(function(e) {
                            $state.go('home');
                        });
                    }]
                }
            })
            .state('dashboard.deck', {
                url: "/:deck",
                templateUrl: "app/components/dashboard/deckDetails.html",
                controller: "DashboardDeckDetailsController",
                controllerAs: "vm",
                resolve: {
                    "user": ["Auth", "$state", function(Auth, $state) {
                        return Auth.$requireSignIn().then(function(d) {
                            return Auth.$getAuth();
                        }).catch(function(e) {
                            $state.go('home');
                        });
                    }]
                }
            })
            .state('studydeck', {
                url: "/studydeck/:deck",
                templateUrl: "app/components/studyDeck/studyDeck.html",
                controller: "studyDeckController",
                controllerAs: "vm",
                resolve: {
                    "user": ["Auth", "$state", "$stateParams",
                        function(Auth, $state, $stateParams) {
                            return Auth.$requireSignIn().then(function(d) {
                                return Auth.$getAuth();
                            }).catch(function(e) {});
                        }
                    ]
                }
            });
    }

})();
