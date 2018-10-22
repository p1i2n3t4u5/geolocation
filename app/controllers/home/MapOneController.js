/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */
"use strict";

mainApp.controller("MapOneController", [
  "$log",
  "$scope",
  "$location",
  "$rootScope",
  "Flash",
  "UserService",
  "$state",
  "StorageService",
  "cfg",
  "NgMap",
  function(
    $log,
    $scope,
    $location,
    $rootScope,
    Flash,
    UserService,
    $state,
    StorageService,
    cfg,
    NgMap
  ) {
    var self = this;

    // self.googleMapsUrl =
    //   "https://maps.googleapis.com/maps/api/js?key=AIzaSyDbcJ-HDROUl8lgUHizqbqPQ7B3LTNejlc";

    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log("markers", map.markers);
      console.log("shapes", map.shapes);
    });
  }
]);
