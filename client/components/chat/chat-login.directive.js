'use strict';

angular.module('chatMdul')
.directive('chatLogin', ['$q', function($q) {
  return {
      restrict: 'E',
      scope: {
        formData:'=?'
      },
      controller: function($scope){
      },
      link: function(scope, element, attrs) {
        scope.props = {
          rooms:[
                  {name:'Room 1', value:'Room1'},
                  {name:'Room 2', value:'Room2'}
                ]
        };

        scope.formData = {
          email:''
        };

        //TODO email field validation with $invalid allows an '@' without a '.' - maybe replace with regex

        scope.joinChat = function(){

          //get gravatar
          // var formData = scope.formData;
          // var props = {
          //   s: formData.size,
          //   d: formData.defaultImage.value,
          //   r: formData.rating.value
          // };
          // if(formData.email){
          //   scope.service.getImageUrl(formData.email, props).then(function(url){
          //     scope.props.avatarUrl = url;
          //     scope.$evalAsync();
          //   });
          // }
        };
      },
      templateUrl: './components/chat/chat-login.html'
    };
}]);
