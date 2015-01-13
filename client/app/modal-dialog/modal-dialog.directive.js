'use strict';

angular.module('simpleSpaApp')
  .directive('modalDialog', function () {
    return {
      restrict: 'EA',
      templateUrl: './app/modal-dialog/modal-dialog.html'
    };
  });
