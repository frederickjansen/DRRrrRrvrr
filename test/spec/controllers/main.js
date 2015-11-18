'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var MainCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    MainCtrl = $controller('MainCtrl', {});
  }));

  it('dummy test', function () {
    expect(1).toBe(1);
  });
});
