/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller("UsersController", [
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
    self.getUserData = getUserData();

    self.user = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      login: '',
      password: '',
      repassword: ''
  };
  self.users = [];
  self.submit=submit;
  self.reset = reset;
   
    function getUserData() {
      console.log("Inside GetUserData method");
      //console.log(StorageService.get("USER.ID"));
     // console.log(StorageService.get("USER.FIRSTNAME"));
      UserService.fetchAllUsers().then(function(successResponse){
        console.log(successResponse);
        self.getUserData= successResponse;
      
      });    
      }

      function submit() {
       
        if (self.user.id === null) {
            console.log('Saving New User', self.user);
            createUser(self.user);
            alert("Called createuser");
        } else {
            updateUser(self.user, self.user.id);
            console.log('User updated with id ', self.user.id);
        }
        reset();
    }

    function updateUser(user, id) {
      UserService.updateUser(user, id)
          .then(
              function (successResponse) {
                  console.log(successResponse);
              },
              function (errResponse) {
                  console.error('Error while updating User');
              }
          );
  }

  function createUser(user) {
    alert(JSON.stringify(user));
    UserService.createUser(user)
        .then(
       function (successResponse) {
                console.log("successresponse "+successResponse);
                alert("successfully added");
            },
            function (errResponse) {
                console.log("errresponse "+errResponse);
             
                console.error('Error while creating User');
                if (errResponse.status === 409) {
                    var message = '<strong>User with same login already exist</strong>';
                    Flash.create('danger', message);
                }
            }
        );
}

    $scope.predicates = ["id","firstName","lastName","login","phone"];
    $scope.selectedPredicate = $scope.predicates[1];
    
    $scope.showForm=false;
    $scope.toggle=function(){
      $scope.showForm=!$scope.showForm;
    }
    function reset() {
        self.user = {
            id: null,
            userName: '',
            address: '',
            email: ''
        };
        $scope.registerForm.$setPristine(); //reset Form
    }
 
  }
]);
