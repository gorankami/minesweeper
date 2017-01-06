var $                 = require("jquery"),
    navigationService = require("./../services/navigation"),
    Cell              = require("./cell");

function Table() {
  this.tableElement = null;
}

Table.prototype.init = function (size, numMines) {
  this.cells = [];
  this.rows  = [];
  for (var rowNum = 0; rowNum < size; rowNum++) {
    var row = [];
    for (var colNum = 0; colNum < size; colNum++) {
      var cell = new Cell(rowNum, colNum);
      row.push(cell);
      this.cells.push(cell);
    }
    this.rows.push(row);
  }
  plantMines(numMines, this.cells, this.rows);
};

Table.prototype.getCells = function () {
  return this.cells;
};

Table.prototype.getRows = function () {
  return this.rows;
};


Table.prototype.getElement = function () {
  if (!this.tableElement) {
    this.tableElement = $('<table></table>');
  }
  return this.tableElement;
};

Table.prototype.render = function () {
  var tableElement = this.getElement();
  tableElement.empty();

  this.rows.forEach(function (row) {
    var rowElement = $('<tr></tr>');
    row.forEach(function (cell) {
      var td = $('<td></td>');
      td.append(cell.getElement());
      cell.render();
      rowElement.append(td);
    });
    tableElement.append(rowElement);
  });
  return tableElement;
};

module.exports = Table;

function plantMines(numMines, cells, rows) {
  var minesPlanted    = 0;
  var safeCellIndexes = [];
  cells.forEach(function (cell, index) {
    safeCellIndexes.push(index);
  });
  while (minesPlanted < numMines) {
    var randIndex     = Math.floor(Math.random() * safeCellIndexes.length);
    var randCellIndex = safeCellIndexes.splice(randIndex, 1)[0];
    cells[randCellIndex].plantMine();
    minesPlanted++;
  }
  //calculate mine count
  safeCellIndexes.forEach(function (cellIndex) {
    cells[cellIndex].surroundingMinesCount = navigationService.countSurroundingMines(cells[cellIndex], rows);
  });
}





