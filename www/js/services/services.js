angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben',
    lastText: 'a casa amarela.',
    face: 'https://www.mundodosanimais.pt/wp-media/imagens/caes-e-gatos-1.jpg'
  }, {
    id: 1,
    name: 'Iury',
    lastText: 'Sim, quando?',
    face: 'http://www.curiosityflux.com/wp-content/uploads/2015/09/ee3.jpg'
  }, {
    id: 2,
    name: 'Mirian',
    lastText: 'Aonde?',
    face: 'http://cdn.mundodastribos.com/375312-racas-de-caes-1.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
