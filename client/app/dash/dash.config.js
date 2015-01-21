'use strict';

angular.module('dashMdul')
.factory('dashConfig', function() {

  var self = {
    navItems:[
          {route:'dashboard.modalDemo', title:'Modal Demo'},
          {route:'dashboard.accordionDemo', title:'Accordion Demo'},
          {route:'dashboard.responsiveTableDemo', title:'Responsive Table Demo'},
          {route:'dashboard.responsiveTabsDemo', title:'Responsive Tabs Demo'},
          {route:'dashboard.chat', title:'Chat'}
        ],
    showSideBarAtStart:false,
    brand:'Component Demos'
  };

  return self;

});
