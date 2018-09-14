/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller(
    'HomeController', ["$log", "$scope", "$location", "$rootScope", "Flash", "UserService", "$state", function ($log, $scope, $location, $rootScope, Flash, UserService, $state) {
        //menu item enable disable logic
        var self = this;
        self.user = {
            id: null,
            firstName: 'my name',
            lastName: 'my last name',
            email: 'zzzz@gmail.com',
            phone: '9999999999',
            capcha: ''
        };
        self.users = [];

        self.submitCapcha = submitCapcha;

        function capcha(user) {
            console.log("hello hello");
            console.log(user);
            UserService.capcha(user)
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


        function submitCapcha() {
            if (self.user.capcha === null || self.user.capcha === '') {
                var message = '<strong>Please select the capcha to post</strong>';
                Flash.create('danger', message);
            } else {
                capcha(self.user);

            }
        }
    }]
);