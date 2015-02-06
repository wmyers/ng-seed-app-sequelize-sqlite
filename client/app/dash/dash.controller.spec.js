/* jshint ignore:start */
'use strict';

describe('Controller: dashCtrl', function () {

  // load the controller's module
  beforeEach(module('simpleSpaApp'));

  var dashCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    // $httpBackend = _$httpBackend_;
    // $httpBackend.expectGET('/api/things')
    //   .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    scope.something = true;
    dashCtrl = $controller('dashCtrl', {
      $scope: scope
    });
  }));

  it('should have something in the scope', function () {
    // $httpBackend.flush();
    expect(scope.something).toBe(true);
  });
});
/* jshint ignore:end */
