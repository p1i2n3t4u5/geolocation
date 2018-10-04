/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */

mainApp.factory("StorageService", [
  "$rootScope",
  "$http",
  "$q",
  "cfg",
  function($rootScope, $http, $q, cfg) {
    return {
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      set: function(key, data) {
        sessionStorage.setItem(key, data);
      },
      remove: function(key) {
        sessionStorage.setItem(key, "");
      }
    };
  }
]);
