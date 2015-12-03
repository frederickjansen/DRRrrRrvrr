'use strict';

angular.module('drr.directives')
  .directive('drrOathButton', [function () {
    return {
      restrict: 'E',
      template: '<button>{{label}}</button>',
      scope: {
        label: '=label'
      },
      link: function ($scope, $element) {
        $element.on('click', function (e) {
          e.preventDefault();
          $scope.$emit('$googleDrive:oauthClick');
        });
      }
    };
  }]);
