/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller("HomeController", [
  "$log",
  "$scope",
  "$location",
  "$rootScope",
  "Flash",
  "UserService",
  "$state",
  "StorageService",
  "cfg",
  "NavigationService",
  function(
    $log,
    $scope,
    $location,
    $rootScope,
    Flash,
    UserService,
    $state,
    StorageService,
    cfg,
    NavigationService
  ) {
    var self = this;
    self.navs = undefined;

    self.getNavigations = getNavigations();

    function getNavigations() {
      NavigationService.findAllByUserTree(StorageService.get("USER.ID")).then(
        function(successResponse) {
          console.log(successResponse);
          self.navs = successResponse;
          $state.go("dashboard");
        },
        function(errResponse) {
          console.error("Error while creating User");
          if (errResponse.status === 409) {
            var message = "<strong>User with same login already exist</strong>";
            Flash.create("danger", message);
          }
        }
      );
    }
  }
]);
