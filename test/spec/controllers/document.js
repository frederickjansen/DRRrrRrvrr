'use strict';

describe('Controller: DocumentCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var DocumentCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    DocumentCtrl = $controller('DocumentCtrl', {});
  }));

  it('dummy test', function () {
    expect(1).toBe(1);
  });
});
