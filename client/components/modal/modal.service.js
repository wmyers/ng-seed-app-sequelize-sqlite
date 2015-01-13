'use strict';

angular.module('uiComps')
  .factory('ModalSrvc', function () {

    var showModal = function(config) {
      self.config = config;
      self.shown = true;
      self.cancellable = config.cancellable || false;
      self.dynamicMessage = config.dynamicMessage || '';
    };

    var resetModal = function(){
      self.shown = false;
      self.config = null;
      self.cancellable = true;
      self.dynamicMessage = '';
    };

    var self = {
      show: showModal,
      reset: resetModal,
    };

    self.reset();

    return self;
  });
