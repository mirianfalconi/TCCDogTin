angular.module('starter.LoginCtrl', [])
.controller('LoginCtrl', function($scope, $ionicPopup, $auth, $location, $http, $window) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(token) {
        console.log(JSON.stringify(token));
      })
      .catch(function(error) {
        console.log(JSON.stringify(error));
        $ionicPopup.alert({
          title: 'Error',
          content: error.message || (error.data && error.data.message) || error
        });
      });
    };

    $scope.logout = function() {
      $auth.logout();
    };

    $scope.isAuthenticated = function() {
      if($auth.isAuthenticated()){
          $location.path('/tab/dash');
      }
      return $auth.isAuthenticated();
    };
});
