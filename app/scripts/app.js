'use strict';

/**
 * @ngdoc overview
 * @name shufflingPines
 * @description
 * # shufflingPines
 *
 * Main module of the application.
 */
angular
  .module('drr', [
    'drr.controllers',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider

        // Setup an abstract state for the tabs directive
        .state('main', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl as main'
        });

      $urlRouterProvider.otherwise('/');
    }]);

// Declare modules
angular.module('drr.controllers', []);
