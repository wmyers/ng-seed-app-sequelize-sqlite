'use strict';

angular.module('uiComps')
.factory('ResponsiveTableSrvc', function () {

  var formatTableData = function(tableData) {

  //NB table data should be in the following format before being
  //further formatted to work with the responsive-table directive.
  //This:
  /*
   * [
   *   [ //row
   *     {colHeaderName1:cellValue},
   *     {colHeaderName2:cellValue},
   *     {colHeaderName3:cellValue}
   *   ],
   *   [ //row
   *     {colHeaderName1:cellValue},
   *     {colHeaderName2:cellValue},
   *     {colHeaderName3:cellValue}
   *   ],
   *   [ //row
   *     {colHeaderName1:cellValue},
   *     {colHeaderName2:cellValue},
   *     {colHeaderName3:cellValue}
   *   ]
   * ]
   *
   //will be formatted to:
   *
   * {
   *    cols:[1,2,3],
   *    firstHeaderName:colHeaderName1,
   *    secondaryHeaderNames:[
   *      colHeaderName2,
   *      colHeaderName3
   *    ],
   *    rows:[
   *      {
   *        firstCell:{name:colHeaderName1, value:cellValue},
   *        secondaryCells:[
   *          {name:colHeaderName2, value:cellValue},
   *          {name:colHeaderName3, value:cellValue}
   *        ]
   *      },
   *      {
   *        firstCell:{name:colHeaderName1, value:cellValue},
   *        secondaryCells:[
   *          {name:colHeaderName2, value:cellValue},
   *          {name:colHeaderName3, value:cellValue}
   *        ]
   *      },
   *      {
   *        firstCell:{name:colHeaderName1, value:cellValue},
   *        secondaryCells:[
   *          {name:colHeaderName2, value:cellValue},
   *          {name:colHeaderName3, value:cellValue}
   *        ]
   *      }
   *    ]
   * }
   */

    if(tableData.length === undefined || tableData.length === null ||
      tableData.length === 0){
      return null;
    }

    var formattedData = {};

    //use the first row for cols
    var cols = [];
    var length = tableData[0].length;
    for(var i=1; i<=length; i++){
      cols.push('col'+i);
    }
    formattedData.cols = cols;

    //use the first row for header names
    var headerNames = [];
    _.forEach(tableData[0], function(value){
      for(var k in value){
        headerNames.push(k);
      }

    });
    //TODO make firstHeaderName a settable attribute
    formattedData.firstHeaderName = headerNames[0];
    formattedData.secondaryHeaderNames = headerNames.slice(1);

    //rows
    var rows =  [];
    _.forEach(tableData, function(row){
      var formattedRow = {};
      var cells = [];
      _.forEach(row, function(value){
        for(var k in value){
          cells.push({name:k, value:value[k]});
        }
      });
      formattedRow.firstCell = cells[0];
      formattedRow.secondaryCells = cells.slice(1);
      rows.push(formattedRow);
    });
    formattedData.rows = rows;

    return formattedData;
  };

  var self = {
    formatTableData:formatTableData
  };

  return self;
});
