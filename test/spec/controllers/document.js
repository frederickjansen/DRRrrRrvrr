'use strict';

describe('Controller: DocumentCtrl', function () {

  // load the controller's module
  beforeEach(module('drr'));

  var DocumentCtrl,
    GoogleDrive,
    scope,
    stateParams;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller, $q) {
    GoogleDrive = {
      displayFile: function () {}
    };
    var deferred = $q.defer();
    spyOn(GoogleDrive, 'displayFile').and.returnValue(deferred.promise);

    scope = $rootScope.$new();
    stateParams = { id: 1 };

    DocumentCtrl = $controller('DocumentCtrl', {
      $scope: scope,
      $stateParams: stateParams,
      GoogleDrive: GoogleDrive
    });
  }));

  it('displayFile not called when gapi is undefined', function () {
    expect(GoogleDrive.displayFile).not.toHaveBeenCalled();
  });

  it('displayFile called after gApiLoaded broadcast', function () {
    scope.$broadcast('$index:gApiLoaded');
    expect(GoogleDrive.displayFile).toHaveBeenCalled();
    //done();
  });
});
