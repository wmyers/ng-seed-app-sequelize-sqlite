'use strict';

angular.module('miscFilters', [])
.filter('daysUntilDate', function() {
  return function(futureDateString) {
    return Math.ceil(((((new Date(futureDateString)-new Date())/1000)/60)/60)/24);
  };
})
//melvin filter
.filter('initialCaps', function () {
  return function (string) {
    return string.trim().split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1);
    }).join(' ');
  };
});
