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
    'drr.services',
    'drr.constants',
    'drr.directives',
    'ui.router',
    'ui.bootstrap',
    'ngSanitize'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider

        // Setup an abstract state for Google OAuth
        .state('index', {
          abstract: true,
          template: '<ui-view/>',
          controller: 'IndexCtrl as index'
        })
        .state('index.list', {
          url: '/',
          templateUrl: 'views/index.html',
          controller: 'ListCtrl as list'
        })
        .state('index.document', {
          url: '/document/:id',
          templateUrl: 'views/document.html',
          controller: 'DocumentCtrl as document'
        });

      $urlRouterProvider.otherwise('/');
    }]);

// Declare modules
angular.module('drr.controllers', []);
angular.module('drr.services', []);
angular.module('drr.directives', []);
angular.module('drr.constants', []);
