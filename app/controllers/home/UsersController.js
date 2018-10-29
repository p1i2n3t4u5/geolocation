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
        self.updateUser = updateUser;
        $scope.flag = 0;

        $scope.showForm = false;

        $scope.toggle = function () {
            reset();
            $scope.flag = 0;
            $scope.showForm = !$scope.showForm;
        }

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
                $scope.flag=0;
                console.log('Saving New User', self.user);
                createUser(self.user);

            } else {
                $scope.flag=1;
                updateUser();
                console.log('User updated with id ', self.user.id);
            }
            reset();
        }

        function fetchUser(id) {

            UserService.fetchUser(id)
                .then(
                    function (successResponse) {
                        self.user = successResponse;
                        self.user.password = "";


                    },
                    function (errResponse) {
                        console.error('Error while updating User');
                    }
                );
        }

        function createUser(user) {
            if($scope.registerForm.$valid){

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
        }

        $scope.predicates = ["id", "firstName", "lastName", "login", "phone"];
        $scope.selectedPredicate = $scope.predicates[1];


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

        function updateUser() {
            
            if($scope.registerForm.$valid){
               
                UserService.updateUser(self.user.id,self.user).then(
                    function (successResponse) {
                        alert("user has updated successfully");
                        getUserData();
                    },
                    function (errResponse) {
                        console.error('Error while updating User');
                    }
    
    
                );
            }
           

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

        $scope.editPopup = function (x) {
            $ngConfirm({
                title: 'Edit user?',
                content: 'Click on edit User to continue.',
                theme: 'dark',
                animation: 'rotate',
                animationSpeed: 500,
                buttons: {
                    editUser: {
                        text: 'Edit user',
                        btnClass: 'btn-red',
                        action: function () {
                            $scope.flag = 1;
                            $scope.$apply();
                            if ($scope.showForm === false) {
                                $scope.showForm = true;
                                $scope.$apply();
                            }


                            fetchUser(x.id);

                        }
                    },
                    cancel: function () {
                        $scope.showForm = false;
                        $scope.$apply();
                    }
                }

            });

        }





    }
]);
