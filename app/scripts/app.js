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
    'drr.constants',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider

        // Setup an abstract state for the tabs directive
        .state('index', {
          url: '/',
          templateUrl: 'views/index.html',
          controller: 'IndexCtrl as index'
        });

      $urlRouterProvider.otherwise('/');
    }]);

// Declare modules
angular.module('drr.controllers', []);
angular.module('drr.constants', []);
