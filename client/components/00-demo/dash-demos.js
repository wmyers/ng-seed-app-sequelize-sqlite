'use strict';

angular.module('dashMdul')
.config(function($stateProvider){
  $stateProvider
    .state('dashboard.modalDemo', {
      url: '/modal-demo',
      templateUrl: './components/00-demo/modal-demo.html',
      controller: 'modalDemoCtrl'
    })
    .state('dashboard.accordionDemo', {
      url: '/accordion-demo',
      templateUrl: './components/00-demo/accordion-demo.html',
      controller: 'accordionDemoCtrl'
    })
    .state('dashboard.responsiveTableDemo', {
      url: '/responsive-table-demo',
      templateUrl: './components/00-demo/responsive-table-demo.html',
      controller: 'responsiveTableDemoCtrl'
    })
    .state('dashboard.responsiveTabsDemo', {
      url: '/responsive-tabs-demo',
      templateUrl: './components/00-demo/responsive-tabs-demo.html',
      controller: 'responsiveTabsDemoCtrl'
    });
})
//modal demo ctrl
.controller('modalDemoCtrl',
              [
                '$scope',
                'ModalSrvc',
                  function (
                    $scope,
                    ModalSrvc
                  ) {

        $scope.modalOKConfig = null;

        $scope.launchModal = function(contentId, targetId, cancellable){
          $scope.modalOKConfig = null;
          targetId = targetId || 0;
          cancellable = cancellable || false;
          var config = { contentId:contentId, targetId:targetId, cancellable:cancellable };
          ModalSrvc.show(config);
        };
        //listen for all modal OK clicks
        $scope.$on(
          'modalOKClickEvent',
          function(event, config){
            $scope.modalOKConfig = config;
        });

}])
//accordion demo ctrl
.controller('accordionDemoCtrl',
              [
                '$scope',
                  function (
                    $scope
                  ) {

        $scope.items = [
          {
            name: 'The Tap',
            title:'The Tap (Tuesday, 13 January -- Secret Diary)',
            body: 'The tap drips and keeps me awake\n'+
                  'In the morning there will be a lake.\n'+
                  'For the want of a washer the carpet will spoil,\n'+
                  'Then for another my father will toil.\n'+
                  'My father could snuff it while he is at work.\n'+
                  'Dad, fit a washer don\'t be a burk!'
          },
          {
            name: 'Untitled',
            title:'Untitled (Monday, 28 September -- Secret Diary)',
            body: 'Bert, you are dead old.\n'+
                  'Fond of Sabre, beetroot and Woodbines.\n'+
                  'We have nothing in common,\n'+
                  'I am fourteen and a half,\n'+
                  'You are eighty-nine.\n'+
                  'You smell, I don\'t.\n'+
                  'Why we are friends\n'+
                  'Is a mystery to me.'
          },
          {
            name :'Longing for Wolverhampton',
            title:'Longing for Wolverhampton by Adrienne Storme (Thursday, 6 May -- Growing Pains)',
            body: 'Jason Westmoreland\'s copper-flecked eyes glanced cynically around the terrace.\n'+
                  'He was sick of Capri and longed for Wolverhampton. He flexed his remaining\n'+
                  'fingers and examined them critically. The accident with the chain saw had ended\n'+
                  'his brilliant career in electronics. His days were now devoid of microchips.\n'+
                  'There was a yawning chasm in his life. He had tried to fill it with travel and\n'+
                  'self-gratification but nothing could blot out the memories he had of Gardenia \n'+
                  'Fetherington, the virginal plastic surgeon, at St. Bupa\'s in Wolverhampton.\n'+
                  'Jason brooded, blindly blinking back big blurry tears....'
          }
        ];

        $scope.$on('modalOKClickEvent',
          function(event, config){
            if(config.contentId === 'deleteAccordionItem'){
              $scope.items.splice(config.index, 1);
            }
        });

}])
//responsiveTable demo ctrl
.controller('responsiveTableDemoCtrl',
              [
                '$scope',
                  function (
                    $scope
                  ) {

       $scope.tableData =
        [
          [ //row
            {Name:'Adrian'},
            {Surname:'Mole'},
            {Age:'13'},
            {Eats:'Fish & Chips'},
            {Pet:'The Dog'}
          ],
          [ //row
            {Name:'Pandora'},
            {Surname:'Braithwaite'},
            {Age:'14'},
            {Eats:'Apples'},
            {Pet:'Blossom'}
          ],
          [ //row
            {Name:'Bert'},
            {Surname:'Baxter'},
            {Age:'89'},
            {Eats:'Beetroot'},
            {Pet:'Sabre'}
          ]
        ];

}])
//responsiveTabs demo ctrl
.controller('responsiveTabsDemoCtrl',
              [
                '$scope',
                  function (
                    $scope
                  ) {

}])
;
