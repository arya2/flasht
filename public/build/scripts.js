'use strict';

(function () {
    'use strict';

    angular.module('flasht.core', ['firebase', 'ui.router']);
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht.core').factory('UserData', UserData);

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
'use strict';

(function () {
    'use strict';

    angular.module('flasht.core').factory('fref', fref);

    fref.$inject = [];

    function fref() {
        return firebase.database().ref();
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht.core').factory('DeckData', DeckData);

    DeckData.$inject = ["fref", "$firebaseArray", "$log"];

    function DeckData(fref, $firebaseArray, $log) {
        var DeckData = this;

        var registeredControllers = [];

        DeckData.dataObj = null;
        DeckData.load = load;
        DeckData.unload = unload;
        DeckData.getDecks = getDecks;

        function load(uid) {
            if (DeckData.dataObj == null) {
                $log.info("DeckData: loading deck data for uid " + uid);
                DeckData.dataObj = $firebaseArray(fref.child(uid).child("decks"));
                DeckData.dataObj.$loaded().then(updateDecks);
            }

            function updateDecks() {
                var d = DeckData.dataObj;
                d.map(function (deck) {
                    deck.cards = $firebaseArray(fref.child(uid).child("decks").child(d.$keyAt(deck)).child("cards"));
                    if (deck.cards.length == 0) deck.cards.$add({
                        card1: 'yolo'
                    });
                });
                registeredControllers.map(function (vm) {
                    vm.decks = d;
                    vm.selectedDeck = vm.decks[vm.decks.length - 1];
                });
            }
        }

        function unload() {
            $log.info("DeckData: unloading deck data");
            DeckData.dataObj;
        }

        function getDecks(vm) {
            registeredControllers.push(vm);
        }

        return DeckData;
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht.core').factory('Auth', Auth);

    Auth.$inject = ["$firebaseAuth"];

    function Auth(f) {
        return f();
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht', ['firebase', 'ui.router', 'ui.bootstrap', 'flasht.core']);
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht').controller('ManageDeckController', ManageDeckController);

    ManageDeckController.$inject = ["currentAuth", "fref", "$firebaseArray", "Auth", "$location", "$state", "$window", "$document"];

    function ManageDeckController(currentAuth, fref, $firebaseArray, Auth, $location, $state, $window, $document) {
        var vm = this;
        vm.user = currentAuth;
        vm.createDeck = createDeck;
        vm.removeDeck = removeDeck;

        vm.decks = $firebaseArray(fref.child(vm.user.uid).child("decks"));

        function createDeck($event) {
            if ($event && $event.type == 'keypress' && event.keyCode != 13) return null;
            vm.decks.$add({
                name: vm.newDeck
            });
        }

        function removeDeck(deck) {
            if ($location.url().split('/')[2] === deck.$id) $state.go('manageDecks');
            vm.decks.$remove(deck);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht').controller('DeckController', DeckController);

    DeckController.$inject = ["cards"];

    function DeckController(cards) {
        var vm = this;
        vm.cards = cards;
        vm.newCard = {};
        vm.createCard = createCard;
        vm.removeCard = vm.cards.$remove;

        function createCard($event) {
            if ($event && $event.type == 'keypress' && event.keyCode != 13) return null;
            vm.cards.$add(vm.newCard);
            vm.newCard = {};
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht').controller('studyDeckController', studyDeckController);

    function studyDeckController() {
        console.log("Study Deck Cotroller loaded");
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht').controller('HomeController', homeController);

    homeController.$inject = ["currentAuth", "$log", "Auth", "$firebaseArray", "fref"];

    function homeController(currentAuth, $log, Auth, $firebaseArray, fref) {
        var vm = this;
        vm.user = currentAuth;
        vm.signin = signin;

        if (vm.user && vm.user.uid) getData();

        function getData(d) {
            vm.decks = $firebaseArray(fref.child(d && d.user.uid || vm.user.uid).child("decks"));
        }

        function signin() {
            vm.user = Auth.$signInWithPopup("google").then(getData);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht').controller("DashboardDeckDetailsController", DashboardDeckDetailsController);

    DashboardDeckDetailsController.$inject = ["user", "$stateParams", "$firebaseObject", "$firebaseArray", "fref"];

    function DashboardDeckDetailsController(user, $stateParams, $firebaseObject, $firebaseArray, fref) {
        var vm = this;
        vm.deck = $firebaseObject(fref.child(user.uid).child('decks').child($stateParams.deck));
        vm.cardsDue = cardsDue;
        vm.totalCards = totalCards;

        function cardsDue() {
            if (!vm.deck.cards) return 0;
            return Object.keys(vm.deck.cards).map(function (key) {
                return vm.deck.cards[key];
            }).filter(function (card) {
                if (!card.due) return true;
                return new Date(card.due) < Date.now();
            }).length;
        }

        function totalCards() {
            if (!vm.deck.cards) return 0;
            return Object.keys(vm.deck.cards).length;
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht').controller("DashboardController", DashboardController);

    DashboardController.$inject = ["decks", "$state"];

    function DashboardController(decks, $state) {
        var vm = this;
        vm.decks = decks;
        vm.removeDeck = vm.decks.$remove;
        decks.$loaded().then(function () {
            $state.go("dashboard.deck", {
                deck: vm.decks[0].$id
            });
        });

        vm.done = done;

        function done(deck) {
            if (!deck.date) return false;
            return new Date(deck.due) > Date.now();
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht.core').run(run);

    run.$inject = ['$state', "$rootScope"];

    function run($state, $rootScope) {
        var config = {
            apiKey: "AIzaSyB-0HLG0XT49vRTmUikcFuzveXkaRS7Xbc",
            authDomain: "flasht.firebaseapp.com",
            databaseURL: "https://flasht.firebaseio.com",
            storageBucket: "project-2366391200623723905.appspot.com"
        };
        firebase.initializeApp(config);
        $state.transitionTo('home');

        $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go("home");
            }
        });
    }
})();
'use strict';

(function () {

    'use strict';

    angular.module('flasht.core').controller('NavController', NavController);

    NavController.$inject = ["Auth", "$state"];

    function NavController(Auth, $state) {
        var nav = this;
        nav.user = Auth.$getAuth();
        nav.signin = signin;
        nav.signout = signOut;

        function signOut() {
            Auth.$signOut();
            $state.go('home');
        }

        Auth.$onAuthStateChanged(function (u) {
            return nav.user = u;
        });

        function signin() {
            nav.user = Auth.$signInWithPopup("google");
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('flasht.core').config(configure);

    configure.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configure($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('home', {
            url: "/",
            templateUrl: "app/components/home/home.html",
            controller: "HomeController",
            controllerAs: "vm",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$waitForSignIn();
                }]
            }
        }).state('manageDecks', {
            url: "/manageDecks",
            templateUrl: "app/components/manageDecks/manageDecks.html",
            controller: "ManageDeckController",
            controllerAs: "vm",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        }).state('manageDecks.deck', {
            url: "/:deck",
            templateUrl: "app/components/manageDecks/deck.html",
            controller: "DeckController",
            controllerAs: "vm",
            resolve: {
                "cards": ["Auth", "$firebaseArray", "fref", "$stateParams", "$state", function (Auth, $firebaseArray, fref, $stateParams, $state) {
                    if (Auth.$getAuth()) {
                        return $firebaseArray(fref.child(Auth.$getAuth().uid).child('decks').child($stateParams.deck).child('cards')).$loaded();
                    }
                    return Auth.$requireSignIn().then(function (d) {
                        return $firebaseArray(fref.child(Auth.$getAuth().uid).child('decks').child($stateParams.deck).child('cards')).$loaded();
                    }).catch(function (e) {
                        $state.go('home');
                    });
                }]
            }
        }).state('dashboard', {
            url: "/dashboard",
            templateUrl: "app/components/dashboard/dashboard.html",
            controller: "DashboardController",
            controllerAs: "vm",
            resolve: {
                "decks": ["Auth", "fref", "$firebaseArray", "$state", function (Auth, fref, $firebaseArray, $state) {
                    return Auth.$requireSignIn().then(function (d) {
                        return $firebaseArray(fref.child(Auth.$getAuth().uid).child('decks'));
                    }).catch(function (e) {
                        $state.go('home');
                    });
                }]
            }
        }).state('dashboard.deck', {
            url: "/:deck",
            templateUrl: "app/components/dashboard/deckDetails.html",
            controller: "DashboardDeckDetailsController",
            controllerAs: "vm",
            resolve: {
                "user": ["Auth", "$state", function (Auth, $state) {
                    return Auth.$requireSignIn().then(function (d) {
                        return Auth.$getAuth();
                    }).catch(function (e) {
                        $state.go('home');
                    });
                }]
            }
        }).state('studydeck', {
            url: "studydeck/:deck",
            templateUrl: "app/components/studyDeck/studyDeck.html",
            controller: "studyDeckController",
            controllerAs: "vm",
            resolve: {
                "user": ["Auth", "$state", function (Auth, $state) {
                    return Auth.$requireSignIn().then(function (d) {
                        return Auth.$getAuth();
                    }).catch(function (e) {
                        $state.go('home');
                    });
                }]
            }
        });
    }
})();