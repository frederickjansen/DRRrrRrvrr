'use strict';

describe('Controller: IndexCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var IndexCtrl, scope;

  // Initialize the controller and a mock scope
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    IndexCtrl = $controller('IndexCtrl', {
      $scope: scope
    });
  }));

  it('dummy test', function () {
    expect(1).toBe(1);
  });
});
