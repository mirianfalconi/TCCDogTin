angular.module('starter.LogoutCtrl', [])
.controller('LogoutCtrl', function($scope, $ionicModal, $auth, $location, $window, $ionicHistory) {

    $auth.logout();
    $window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $location.path('/login');

});
