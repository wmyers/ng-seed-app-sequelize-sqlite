'use strict';

angular.module('gravatarMdul')
.directive('gravatarForm', ['$q', function($q) {
  return {
      restrict: 'E',
      scope: {
        isShowSettings:'=?',
        isShowPreviewUrl:'=?',
        isShowPreview:'=?',
        isOptional:'=?'
      },
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

        //default values
        var boolify = function(str){
          return str === 'true' ? true : false;
        };
        scope.isShowSettings = scope.isShowSettings !== undefined ? boolify(scope.isShowSettings) : false;
        scope.isShowPreview = scope.isShowPreview !== undefined ? boolify(scope.isShowPreview) : true;
        scope.isShowPreviewUrl = scope.isShowPreviewUrl !== undefined ? boolify(scope.isShowPreviewUrl) : false;

        scope.formData = {
          size: 80,
          defaultImage:scope.props.defaultImages[0],
          rating:scope.props.ratings[0],
          email:'',
          avatarUrl:''
        };

        scope.getAvatarUrl = function(options){
          var formData = scope.formData;
          options = options || {};
          var props = {
            s: formData.size,
            d: formData.defaultImage.value,
            r: formData.rating.value
          };

          if(options.forceDefault){
            props.f = 'y';
          }

          //NB angular email form input validation with ng-required allows an '@' without a '.'
          var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

          //requires regex match unless allowing default image(then email can be any string)
          if(options.allowDefault || options.forceDefault || regex.exec(formData.email)){
            return scope.service.getImageUrl(formData.email, props).then(function(url){
              return $q.when(url);
            });
          }
          return $q.reject('Email incorrect');
        };


        scope.setAvatarUrl = function(){
          scope.getAvatarUrl().then(function(url){
            scope.formData.avatarUrl = url;
            scope.$evalAsync();
          });
        };
      },
      templateUrl: './components/gravatar/gravatar-form.html'
    };
}]);
