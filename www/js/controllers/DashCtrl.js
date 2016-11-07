angular.module('starter.DashCtrl', [])
.controller('DashCtrl', function($scope, $window) {


  var cardTypes = [
      { image: 'https://www.mundodosanimais.pt/wp-media/imagens/caes-e-gatos-1.jpg', title: 'Nando e Nandinho #hippster'},
      { image: 'http://www.curiosityflux.com/wp-content/uploads/2015/09/ee3.jpg', title: 'Oi, nos adota?'},
      { image: 'http://cdn.mundodastribos.com/375312-racas-de-caes-1.jpg', title: 'Somos #hippster'},
      { image: 'http://www.emdialogo.uff.br/sites/default/files/images/caes-dizer-abanam-rabo-animal-planet.jpg', title: 'Lindo, muito prazer!'},
  ];

  $scope.cards = [];

  $scope.token = $window.localStorage;

  $scope.addCard = function(i) {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
  }

  for(var i = 0; i < 4; i++) $scope.addCard();

  $scope.cardSwipedLeft = function(index) {
      console.log('Left swipe');
  }

  $scope.cardSwipedRight = function(index) {
      console.log('Right swipe');
  }

  $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
      console.log('Card removed');
  }


});
