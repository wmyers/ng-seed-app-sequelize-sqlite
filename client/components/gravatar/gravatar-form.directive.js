'use strict';

angular.module('gravatarMdul')
.directive('gravatarForm', ['$q', function($q) {
  return {
      restrict: 'E',
      scope: {
        isOptional:'=?',
        isShowSettings:'=?',
        isShowPreviewUrl:'=?',
        isShowPreview:'=?',
        formData:'=?'
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

        //TODO email field validation with $invalid allows an '@' without a '.' - maybe replace with regex

        scope.getAvatarUrl = function(){
          var formData = scope.formData;
          var props = {
            s: formData.size,
            d: formData.defaultImage.value,
            r: formData.rating.value
          };
          if(formData.email){
            return scope.service.getImageUrl(formData.email, props).then(function(url){
              return $q.when(url);
            });
          }
          return $q.reject('Email missing');
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
