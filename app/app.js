"use strict";

/* global FB, $window */

var $stateProviderRef = null;
var $urlRouterProviderRef = null;

window.fbAsyncInit = function() {
  FB.init({
    appId: "974762349267261",
    xfbml: true,
    version: "v2.5"
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

var mainApp = angular.module("myapp", [
  "ngRoute",
  "ngResource",
  "ui.router",
  "ngFlash",
  "jcs-autoValidate",
  "vcRecaptcha",
  "smart-table",
  "ngMap"
]);

mainApp.run(function(defaultErrorMessageResolver) {
  defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
    errorMessages["tooYoung"] =
      "You Must Be Atleast {0} years old to use this site";
    errorMessages["tooYoung"] =
      "You Must Be Atleast {0} years old to use this site";
    errorMessages["badUserName"] =
      "User name can contain only numbers,letters and _";
    errorMessages["badPassword"] =
      "Password can contain only numbers,letters and _";
    errorMessages["badPhoneNumber"] = "Phone number is not  valid ";
  });
});

mainApp.run([
  "$rootScope",
  "$state",
  "$stateParams",
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
]);
// .controller("AController", ["$scope", function($scope) {}])
// .controller("SController", ["$scope", function($scope) {}]);

mainApp.config([
  "$routeProvider",
  "$urlMatcherFactoryProvider",
  "$stateProvider",
  "$urlRouterProvider",
  "$httpProvider",
  function(
    $routeProvider,
    $urlMatcherFactoryProvider,
    $stateProvider,
    $urlRouterProvider,
    $httpProvider
  ) {
    $urlRouterProvider.otherwise("/loginregister/login");
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlMatcherFactoryProvider.strictMode(false);
    $httpProvider.defaults.withCredentials = true;

    $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
      .state("loginregister", {
        url: "/loginregister",
        templateUrl: "views/login_register.html",
        controller: "LoginRegisterController",
        controllerAs: "ctrl",
        abstract: true
      })
      // nested list with custom controller
      .state("loginregister.register", {
        url: "/register",
        templateUrl: "views/login_register/register.html",
        controller: "RegisterController",
        controllerAs: "ctrl"
      })
      // nested list with custom controller
      .state("loginregister.login", {
        url: "/login",
        templateUrl: "views/login_register/login.html",
        controller: "LoginController",
        controllerAs: "ctrl"
      })

      .state("home", {
        url: "/home",
        templateUrl: "views/home.html",
        controller: "HomeController",
        controllerAs: "ctrl"
      });

    $stateProviderRef = $stateProvider;
    $urlRouterProviderRef = $urlRouterProvider;
  }
]);

mainApp.run([
  "$q",
  "$rootScope",
  "$http",
  "$urlRouter",
  function($q, $rootScope, $http, $urlRouter) {
    var $state = $rootScope.$state;

    $http.get("modules.json").success(function(data) {
      angular.forEach(data, function(value, key) {
        var getExistingState = $state.get(value.name);

        if (getExistingState !== null) {
          return;
        }

        var state = {
          url: value.url,
          parent: value.parent,
          abstract: value.abstract,
          controller: value.controller,
          controllerAs: value.controllerAs,
          views: {}
        };

        angular.forEach(value.views, function(view) {
          state.views[view.name] = {
            templateUrl: view.templateUrl
          };
        });

        $stateProviderRef.state(value.name, state);
      });
      // Configures $urlRouter's listener *after* your custom listener

      $urlRouter.sync();
      $urlRouter.listen();
    });
  }
]);
