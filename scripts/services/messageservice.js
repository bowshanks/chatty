'use strict';

angular.module('chattyApp')
  .factory('messageService', function ( $http ) {
    return {
      getMessages: function () {
        return $http.get('http://localhost:8989');
      },

      addMessage: function ( message, username ) {
        console.log(message,username);
        return $http.post('http://localhost:8989', { message: message,
                                                     username: username
                                                    });
      }
    };
  });
