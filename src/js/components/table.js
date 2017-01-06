var navigationService = require("./../services/navigation"),
    settingsService   = require("./../services/settings"),
    Cell              = require("./cell");

function Table() {
  this.tableElement = null;
}

Table.prototype.init = function (size) {
  this.cells = [];
  for (var rowNum = 0; rowNum < size; rowNum++) {
    for (var colNum = 0; colNum < size; colNum++) {
      var cell = new Cell(rowNum, colNum);
      this.cells.push(cell);
    }
  }
};

Table.prototype.getCells = function () {
  return this.cells;
};

Table.prototype.getElement = function ($) {
  if (!this.tableElement) {
    this.tableElement = $('<table></table>');
  }
  return this.tableElement;
};

Table.prototype.render = function ($) {
  var tableElement = this.getElement($);
  tableElement.empty();

  for (var i = 0; i < settingsService.size; i++) {
    var rowElement = $('<tr></tr>');
    for (var j = 0; j < settingsService.size; j++) {
      var cell = this.getCells()[i*settingsService.size + j];
      var td = $('<td></td>');
      td.append(cell.getElement($));
      cell.render($);
      rowElement.append(td);
    }
    tableElement.append(rowElement);
  }
  return tableElement;
};

Table.prototype.plantMines = function (numMines, avoidanceCell) {
  var minesPlanted       = 0;
  var safeCellIndexes    = [];
  var avoidanceCellindex = -1;
  this.cells.forEach(function (cell, index) {
    if (cell === avoidanceCell) {
      avoidanceCellindex = index;
    } else {
      safeCellIndexes.push(index);
    }
  });
  while (minesPlanted < numMines) {
    var randIndex     = Math.floor(Math.random() * safeCellIndexes.length);
    var randCellIndex = safeCellIndexes.splice(randIndex, 1)[0];
    this.cells[randCellIndex].plantMine();
    minesPlanted++;
  }
  //calculate mine count
  safeCellIndexes.push(avoidanceCellindex);

  //closure reach
  var cells = this.cells;
  safeCellIndexes.forEach(function (cellIndex) {
    cells[cellIndex].surroundingMinesCount = navigationService.countSurroundingMines(cells[cellIndex], cells, settingsService.size);
  });
};

module.exports = Table;






