'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var IndexCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    IndexCtrl = $controller('IndexCtrl', {});
  }));

  it('dummy test', function () {
    expect(1).toBe(1);
  });
});
