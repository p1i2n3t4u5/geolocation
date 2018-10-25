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
    "$ngConfirm",
    function (
        $log,
        $scope,
        $location,
        $rootScope,
        Flash,
        UserService,
        $state,
        StorageService,
        cfg,
        $ngConfirm
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
        self.submit = submit;
        self.reset = reset;
        self.fetchUser = fetchUser;
        
       
        function getUserData() {
            console.log("Inside GetUserData method");
            //console.log(StorageService.get("USER.ID"));
            // console.log(StorageService.get("USER.FIRSTNAME"));
            UserService.fetchAllUsers().then(function (successResponse) {
                console.log(successResponse);
                self.getUserData = successResponse;

            });
        }

        function submit() {

            if (self.user.id === null) {
                console.log('Saving New User', self.user);
                createUser(self.user);
                
            } else {
               // updateUser(self.user, self.user.id);
                console.log('User updated with id ', self.user.id);
            }
            reset();
        }

        function fetchUser(id) {
            alert("fetch user");
            UserService.fetchUser(id)
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

            UserService.createUser(user)
                .then(
                    function (successResponse) {
                        console.log("successresponse " + successResponse);
                        getUserData();
                    },
                    function (errResponse) {
                        console.log("errresponse " + errResponse);
                        console.error('Error while creating User');
                        if (errResponse.status === 409) {
                            var message = '<strong>User with same login already exist</strong>';
                            Flash.create('danger', message);
                        }
                    }
                );
        }

        $scope.predicates = ["id", "firstName", "lastName", "login", "phone"];
        $scope.selectedPredicate = $scope.predicates[1];

        $scope.showForm = false;
        $scope.toggle = function () {
            $scope.showForm = !$scope.showForm;
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


        function removeItem(x) {
            UserService.deleteUser(x.id).then(
                function (successResponse) {
                    console.log("successresponse " + successResponse);
                    getUserData();
                },
                function (errResponse) {
                    console.log("errresponse " + errResponse);
                    console.error('Error while deleting User');
                    if (errResponse.status === 409) {
                        var message = '<strong>User with same login already exist</strong>';
                        Flash.create('danger', message);
                    }
                }

            );

        }
      

        $scope.confirmPopup = function (x) {
            $ngConfirm({
                title: 'Delete user?',
                content: 'This dialog will automatically trigger \'cancel\' in 6 seconds if you don\'t respond.',
                autoClose: 'cancel|8000',
                theme: 'dark',
                animation: 'rotateYR',
                animationSpeed: 500,
                buttons: {
                    deleteUser: {
                        text: 'delete user',
                        btnClass: 'btn-red',
                        action: function () {
                            removeItem(x);
                            $ngConfirm('Deleted the user!');
                        }
                    },
                    cancel: function () {
                        $ngConfirm('Cancelled');
                    }
                }

            });

        }

        

    }
]);
