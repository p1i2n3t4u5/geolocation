/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global mainApp */

mainApp.factory(
    "UserService",
    function ($http, $q, cfg) {
        var REST_SERVICE_URI = cfg.url + "/user";

        var factory = {
            fetchAllUsers: fetchAllUsers,
            createUser: createUser,
            fetchUser: fetchUser,
            deleteUser: deleteUser,
            capcha: capcha
        };

        return factory;

        function fetchAllUsers() {
            var deferred = $q.defer();
            $http.get(REST_SERVICE_URI)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                        console.log("Response data " + response.data);
                    },
                    function (errResponse) {
                        console.error('Error while fetching Users');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function capcha(user) {
            var deferred = $q.defer();
            $http.post(REST_SERVICE_URI + "capcha", user)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while creating User');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }


        function createUser(user) {

            var deferred = $q.defer();
            $http({
                url: REST_SERVICE_URI,
                method: "POST",
                data: user
            })
                .then(
                    function (response) {
                        console.log("Service called user success");
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.log("Service called user failed");
                        console.error('Error while creating User');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }


        function fetchUser(id) {
            
            var deferred = $q.defer();
            $http.get(REST_SERVICE_URI +"/"+id)
                .then(
                    function (response) {
                        console.log(response);
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while updating User');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function deleteUser(id) {
            var deferred = $q.defer();
            $http.delete(REST_SERVICE_URI +"/"+id)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while deleting User');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }



    });