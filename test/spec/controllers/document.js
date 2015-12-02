'use strict';

describe('Controller: DocumentCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var DocumentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    DocumentCtrl = $controller('DocumentCtrl', {
      $scope: scope
    });
  }));

  it('dummy test', function () {
    expect(1).toBe(1);
  });
});
