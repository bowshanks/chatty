'use strict';

angular.module('chattyApp')
  .controller('MainCtrl', function ( $scope, messageService ) {
    messageService.getMessages().then(function ( response ) {
      $scope.messages = response.data;
    });

    $scope.addMessage = function ( message, username ) {
      document.forms['messageForm'].reset()
      if (message) {
        messageService.addMessage(message, username).then(function ( response ) {
          $scope.messages = response.data;
        });

      }
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
