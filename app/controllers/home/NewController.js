/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller("NewController", [
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

    function getUserData() {
      console.log(StorageService.get("USER.ID"));
      console.log(StorageService.get("USER.FIRSTNAME"));
    }
  }
]);
