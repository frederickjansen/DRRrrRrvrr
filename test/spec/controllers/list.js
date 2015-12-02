'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var ListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    ListCtrl = $controller('ListCtrl', {
      $scope: scope
    });
  }));

  it('dummy test', function () {
    expect(1).toBe(1);
  });
});
