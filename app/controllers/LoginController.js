/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global mainApp */

"use strict";

mainApp.controller(
    'LoginController',["$log", "$scope", "$location", "$rootScope", "Flash", "LoginService", "$state",
    function($log, $scope, $location, $rootScope, Flash, LoginService, $state) {
        var self = this;
        self.loginForm = { username: '', password: '' };
        self.authenticateUser = authenticateUser;

        function authenticateUser() {
            console.log(this);
            console.log(self);
            console.log("inside login controller" + this.loginForm.username + "  " + this.loginForm.password);
            LoginService.authenticateUser(this.loginForm)
                .then(
                    function(successResponse) {
                        console.log(successResponse);
                        /* $state.go('loginregister.register'); */
                        $state.go('home');
                    },
                    function(errResponse) {
                        console.error('Error while creating User');
                        if (errResponse.status === 409) {
                            var message = '<strong>User with same login already exist</strong>';
                            Flash.create('danger', message);
                        }
                    }
                );
        }
    }
]
);