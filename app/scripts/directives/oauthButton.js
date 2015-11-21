angular.module('drr.directives')
  .directive('drrOathButton', [function () {
    return {
      restrict: 'E',
      templateUrl: 'views/oathButton.html',
      scope: {
        label: '='
      },
      link: function ($scope, $element, $attrs) {
        $element.on('click', function (e) {
          e.preventDefault();
          alert('click');
        })
      }
    };
  }]);
