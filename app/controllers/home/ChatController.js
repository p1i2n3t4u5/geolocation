/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller("ChatController", [
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
    var self = this;

    self.getUserData = getUserData;

    var REST_SERVICE_URI = cfg.url;

    function getUserData() {
      console.log(StorageService.get("USER.ID"));
      console.log(StorageService.get("USER.FIRSTNAME"));
    }
  }
]);
