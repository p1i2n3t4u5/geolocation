"use strict";

/* global FB, $window */

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
  "vcRecaptcha"
]);

// angular.module(‘angularRecaptcha’,[‘vcRecaptcha’])

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
        controllerAs: "regisCtrl",
        abstract: true
      })
      // nested list with custom controller
      .state("loginregister.register", {
        url: "/register",
        templateUrl: "views/login_register/register.html",
        controller: "RegisterController",
        controllerAs: "regisCtrl"
      })
      // nested list with custom controller
      .state("loginregister.login", {
        url: "/login",
        templateUrl: "views/login_register/login.html",
        controller: "LoginController",
        controllerAs: "loginCtrl"
      })

      .state("home", {
        url: "/home",
        templateUrl: "views/home.html",
        controller: "HomeController",
        controllerAs: "homeCtrl"
      });
  }
]);

mainApp.directive("modal", function() {
  return {
    template:
      '<div class="modal fade">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
      '<h4 class="modal-title">{{ buttonClicked }} clicked!!</h4>' +
      "</div>" +
      '<div class="modal-body" ng-transclude></div>' +
      "</div>" +
      "</div>" +
      "</div>",
    restrict: "E",
    transclude: true,
    replace: true,
    scope: true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value) {
        if (value == true) $(element).modal("show");
        else $(element).modal("hide");
      });

      $(element).on("shown.bs.modal", function() {
        scope.$apply(function() {
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on("hidden.bs.modal", function() {
        scope.$apply(function() {
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
});
