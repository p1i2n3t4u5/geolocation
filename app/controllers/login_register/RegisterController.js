/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */

"use strict";
mainApp.controller(
    'RegisterController', ["$scope", "UserService", "$state", "Flash", function ($scope, UserService, $state, Flash) {
        var self = this;
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
        self.edit = edit;
        self.remove = remove;
        self.reset = reset;


        function createUser(user) {
            UserService.createUser(user)
                .then(
                    function (successResponse) {
                        console.log(successResponse);
                        $state.go('loginregister.login');
                    },
                    function (errResponse) {
                        console.error('Error while creating User');
                        if (errResponse.status === 409) {
                            var message = '<strong>User with same login already exist</strong>';
                            Flash.create('danger', message);
                        }
                    }
                );
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

        function deleteUser(id) {
            UserService.deleteUser(id)
                .then(
                    function (successResponse) {
                        console.log(successResponse);
                    },
                    function (errResponse) {
                        console.error('Error while deleting User');
                    }
                );
        }

        function submit() {
            if (self.user.id === null) {
                console.log('Saving New User', self.user);
                createUser(self.user);
            } else {
                updateUser(self.user, self.user.id);
                console.log('User updated with id ', self.user.id);
            }
            reset();
        }

        function edit(id) {
            console.log('id to be edited', id);
            for (var i = 0; i < self.users.length; i++) {
                if (self.users[i].id === id) {
                    self.user = angular.copy(self.users[i]);
                    break;
                }
            }
        }

        function remove(id) {
            console.log('id to be deleted', id);
            if (self.user.id === id) { //clean form if the user to be deleted is shown there.
                reset();
            }
            deleteUser(id);
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

    }]);