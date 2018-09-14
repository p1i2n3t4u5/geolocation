/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */

mainApp.factory(
    "LoginService",
    function($http, $q, cfg) {
        var REST_SERVICE_URI = cfg.url + "/login";

        var factory = {
            authenticateUser: authenticateUser
        };

        return factory;


        function authenticateUser(loginForm) {
            console.log(loginForm);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: REST_SERVICE_URI,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: 'username=' + loginForm.username + '&password=' + loginForm.password
            }).then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(errResponse) {
                    console.error('Error while creating User');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function callCapcha(loginForm) {
            console.log(loginForm);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: REST_SERVICE_URI,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: 'username=' + loginForm.username + '&password=' + loginForm.password
            }).then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(errResponse) {
                    console.error('Error while creating User');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }


    });