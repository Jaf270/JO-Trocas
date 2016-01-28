'Use Strict';
angular.module('RioTrocasApp', ['ionic','ionic-material','ngStorage', 'ngCordova','firebase','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
    /**Auth Routes**/
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })

    /** Demo Material design */
    .state('components', {
      url: '/components',
      templateUrl: 'templates/components.html',
      controller:'ComponentsCtrl'
    })
    .state('extensions', {
      url: '/extensions',
      templateUrl: 'templates/extensions.html',
      controller:'ExtensionsCtrl'
    })
    .state('motion', {
      url: '/motion',
      templateUrl: 'templates/motion.html',
      controller:'MotionCtrl'
    })
    .state('lists', {
      url: '/lists',
      templateUrl: 'templates/lists.html',
      controller:'ListsCtrl'
    })

    // App after login
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.tickets', {
        url: '/tickets',
        views: {
            'menuContent': {
                templateUrl: 'views/tickets/tickets.html',
                controller: 'ticketsController'
            }
        }
    })
      .state('app.ticket', {
        url: '/tickets/:id',
        views: {
          'menuContent':{
            templateUrl: 'views/ticket/ticket.html',
            controller:'ticketController'
          }
        }
      })
      .state('app.exchanges', {
        url: '/exchanges',
        views: {
            'menuContent': {
                templateUrl: 'views/exchanges/exchanges.html',
                controller: 'exchangesController'
            }
        }
    })

    /*DEMO COMPLETE */
    .state('app.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('app.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })
    ;
$urlRouterProvider.otherwise("/login");
})

// Changue this for your Firebase App URL.
.constant('FURL', 'https://rio2016-trocas.firebaseio.com')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
        if (ionic.Platform.isAndroid()) {
          StatusBar.backgroundColorByHexString("#608628");
        } else {
          StatusBar.styleLightContent();
        }
    }

  });
});
