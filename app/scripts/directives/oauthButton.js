angular.module('drr.directives')
  .directive('drrOathButton', ['GoogleDrive', function (GoogleDrive) {
    return {
      restrict: 'E',
      templateUrl: 'views/oathButton.html',
      scope: {
        label: '='
      },
      link: function ($scope, $element, $attrs) {
        $element.on('click', function (e) {
          e.preventDefault();
          $scope.$emit('$googleDrive:oauthClick');
        })
      }
    };
  }]);
