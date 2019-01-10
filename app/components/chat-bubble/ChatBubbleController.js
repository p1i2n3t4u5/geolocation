/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller('ChatBubbleController', [
  "$log",
  "$scope",
  "$location",
  "$rootScope",
  "Flash",
  "UserService",
  "$state",
  "StorageService",
  "cfg",
  function(
    $log,
    $scope,
    $location,
    $rootScope,
    Flash,
    UserService,
    $state,
    StorageService,
    cfg
  ) {
    var vm = this;

    vm.messages = [
      {
        user: 'Pintu',
        message: 'A sample message',
        time: 'Jan 01, 2019 4:28PM',
        isSender: true
      },
      {
        user: 'MIIM',
        message: 'Different message',
        time: 'Jan 01, 2019 5:28PM',
        isSender: false
      },
      {
        user: 'WOW',
        message: 'Same message again',
        time: 'Jan 01, 2019 3:28PM',
        isSender: true
      }
    ];
    
  }
]);