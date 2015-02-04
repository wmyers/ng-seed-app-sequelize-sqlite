'use strict';

angular.module('gravatarMdul')
.directive('gravatarForm', ['$q', function($q) {
  return {
      restrict: 'E',
      scope: {},
      controller: function($scope, gravatarSrvc){
        $scope.service = gravatarSrvc;
      },
      link: function(scope, element, attrs) {
        scope.props = {
          ratings:[
                          {name:'Universal', value:'g'},
                          {name:'Parental Guidance', value:'pg'},
                          {name:'May Offend', value:'r'},
                          {name:'X-Rated', value:'x'}
                        ],
          defaultImages:[
                          {name:'Mystery Man', value:'mm'},
                          {name:'Identicon', value:'identicon'},
                          {name:'Monster', value:'monsterid'},
                          {name:'Wavatar', value:'wavatar'},
                          {name:'Retro', value:'retro'}
                        ]
        };

        scope.setAvatarUrl = function(formData){
          var props = {
            s: formData.size,
            d: formData.defaultImage,
            r: formData.rating
          };
          scope.service.getImageUrl(formData.email, props).then(function(url){
            scope.props.avatarUrl = url;
            scope.$digest();
          });
        };
      },
      templateUrl: './components/gravatar/gravatar-form.html'
    };
}]);
