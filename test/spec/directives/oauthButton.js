'use strict';

describe('Directive: oauthButton', function () {
  var compile,
    scope,
    element;

  // Load the drr module, which contains the directive
  beforeEach(module('drr'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function ($compile, $rootScope) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    compile = $compile;
    scope = $rootScope.$new();
  }));

  beforeEach(function () {
    // Compile a piece of HTML containing the directive
    element = compile("<drr-oath-button label='label'></drr-oath-button>")(scope);
    // fire all the watches, so the scope expression {{label}} will be evaluated
    scope.$digest();
  });

  it('Replaces the element with the appropriate content', function () {
    scope.label = 'Authorize';
    scope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("<button class=\"ng-binding\">Authorize</button>");
  });
});
