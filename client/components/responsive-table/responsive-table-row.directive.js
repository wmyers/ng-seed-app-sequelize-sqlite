'use strict';

angular.module('uiComps')
.directive('responsiveTable', function() {
  return {
    restrict: 'E',
    //pass in unformatted table-data as an attribute
    scope:{
      tableData:'='
    },
    templateUrl: './components/responsive-table/responsive-table.html',
    controller: function($scope, ResponsiveTableSrvc){
      //format the tableData with the responsive-table-service
      var formattedTableData = ResponsiveTableSrvc.formatTableData($scope.tableData);
      if(formattedTableData !== null){
        $scope.formattedTableData = formattedTableData;
      }else{
        console.log('Incorrectly formatted table data in responsive-table directive');
      }
    }
  };
})
.directive('responsiveTableRow', function() {
  return {
    restrict: 'E',
    scope:{
      row:'='
    },
    templateUrl: './components/responsive-table/responsive-table-row.html',
  };
});
