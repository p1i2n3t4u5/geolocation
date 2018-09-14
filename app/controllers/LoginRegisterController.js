/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global mainApp */

"use strict";


mainApp.controller(
    'LoginRegisterController',["$scope","$location",
    function($scope, $location) {
        //menu item enable disable logic
        $scope.isActive = function(destination) {
            //console.error('Error '+destination);
            return $location.path().endsWith(destination);
        }
    }
  ]
);