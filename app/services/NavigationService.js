/* global mainApp */

mainApp.factory("NavigationService", function($http, $q, cfg) {
  var REST_SERVICE_URI = cfg.url + "/navigation/";

  var factory = {
    findAllByUserTree: findAllByUserTree
  };
  console.log("NavigationService");
  return factory;

  function findAllByUserTree(userId) {
    var deferred = $q.defer();
    $http.get(REST_SERVICE_URI + "findAllByUserTree/" + userId).then(
      function(response) {
        deferred.resolve(response.data);
      },
      function(errResponse) {
        console.error("Error while fetching Users");
        deferred.reject(errResponse);
      }
    );
    return deferred.promise;
  }
});
