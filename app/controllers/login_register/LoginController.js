/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global mainApp */

"use strict";

mainApp.controller("LoginController", [
  "$log",
  "$scope",
  "$location",
  "$rootScope",
  "Flash",
  "LoginService",
  "$state",
  "StorageService",
  "cfg",
  function (
    $log,
    $scope,
    $location,
    $rootScope,
    Flash,
    LoginService,
    $state,
    StorageService,
    cfg
  ) {
    var self = this;
    self.loginForm = { username: "", password: "" };
    self.authenticateUser = authenticateUser;

    function authenticateUser() {
      console.log(
        "inside login controller" +
        this.loginForm.username +
        "  " +
        this.loginForm.password
      );
      LoginService.authenticateUser(this.loginForm).then(
        function (successResponse) {
          console.log(successResponse);
          //STORING USER DATA TO SESSION STORAGE
          StorageService.set(cfg.USER.ID, successResponse.id);
          StorageService.set(cfg.USER.FIRSTNAME, successResponse.firstName);
          StorageService.set(cfg.USER.LASTNAME, successResponse.lastName);
          StorageService.set(cfg.USER.EMAIL, successResponse.email);
          StorageService.set(cfg.USER.PHONE, successResponse.phone);
          StorageService.set(cfg.USER.LOGIN, successResponse.login);
          StorageService.set(cfg.USER.ROLES, successResponse.roles);

          $state.go("home");
        },
        function (errResponse) {
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
