
angular.module('starter', ['ionic', 'starter.AppCtrl', 'starter.LoginCtrl', 'starter.DashCtrl', 'starter.ChatsCtrl', 'starter.ChatDetailCtrl', 'starter.AccountCtrl', 'starter.LogoutCtrl', 'starter.services', 'ionic.contrib.ui.tinderCards', 'ngCordova', 'ngMessages', 'satellizer'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$httpProvider', function($httpProvider) {
	        $httpProvider.defaults.useXDomain = true;
	        delete $httpProvider.defaults.headers.common['X-Requested-With'];
	    }
])

.factory('checkRouting', function($auth, $location) {

  return {
      auth: function(){
        if ( ! $auth.isAuthenticated() ) { $location.path('/login'); }
        else { return true; }
      }
  };

})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })


  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl',
        resolve: { factory: function(checkRouting){ return checkRouting.auth() } }
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl',
          resolve: { factory: function(checkRouting){ return checkRouting.auth() } }
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl',
          resolve: { factory: function(checkRouting){ return checkRouting.auth() } }
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl',
          resolve: { factory: function(checkRouting){ return checkRouting.auth() } }
        }
      }
    })

    .state('app', {
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/tab-login.html',
            controller: 'LoginCtrl'
          }
        }
    })

    .state('app.logout', {
      url: '/logout',
      views: {
        'menuContent': {
          controller: 'LogoutCtrl'
        }
      }
  });

  $urlRouterProvider.otherwise('/tab/dash');

})

.config(function($authProvider) {
   var commonConfig = {
     popupOptions: {
       location: 'yes',
       toolbar: 'yes',
       width: window.screen.width,
       height: window.screen.height
     }
   };

   $authProvider.withCredentials = true;
   $authProvider.httpInterceptor = true;


   if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
      $authProvider.platform   = 'mobile';
      commonConfig.redirectUri =  window.location.protocol + '//' + window.location.host;
   }

   $authProvider.facebook({
    name: 'facebook',
    url: 'http://max.com:5000/auth/facebook',
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    redirectUri: window.location.origin + '/',
    clientId: '1426474154033403',
    response_type : token
    });


   $authProvider.google(angular.extend({}, commonConfig, {
     clientId: '140794699812-p999i846rc04unvrh6s49984n5m7hlhs.apps.googleusercontent.com',
     url: 'http://max.com:5000/auth/google',
     access_type : 'offline',
     approval_prompt : 'force'
     }));
});
