var $      = require("jquery"),
    utils  = require("./utils"),
    STATES = require("./states")
Cell       = require("./cell");

function Table() {
}

Table.prototype.init = function (tableElement, m, n, numMines) {
  var rows = createTableCells(m, n);
  populateElements(tableElement, rows);
  plantMines(rows, numMines);
  setupMineCountOnCells(rows);
  this.rows = rows;
};

Table.setupMineCountOnCells = setupMineCountOnCells;
Table.countSurroundingMines = countSurroundingMines;

Table.prototype.render = function () {
  render(this.rows);
};

function createTableCells(maxRowNum, maxColNum) {
  var rows = [];
  for (var rowNum = 0; rowNum < maxRowNum; rowNum++) {
    var row = [];
    for (var colNum = 0; colNum < maxColNum; colNum++) {
      row.push(new Cell(rowNum, colNum));
    }
    rows.push(row);
  }
  return rows;
}

function populateElements(tableElement, rows) {
  tableElement.empty();
  rows.forEach(function (row) {
    var rowElement = $('<tr></tr>');
    row.forEach(function (cell) {
      rowElement.append(cell.getElement());
    });
    tableElement.append(rowElement);
  });
}

function render(rows) {
  rows.forEach(function (row) {
    row.forEach(function (cell) {
      cell.render();
    });
  });
}

function plantMines(rows, numMines) {
  // rows[0][0].plantMine();
  // rows[0][1].plantMine();
  //
  var plantedMineCells = [];
  while (plantedMineCells.length < numMines) {
    var randRow  = rows[utils.rand(0, rows.length - 1)];
    var randCell = randRow[utils.rand(0, randRow.length - 1)];
    if (plantedMineCells.indexOf(randCell) < 0) { //don't pick the same cell twice
      plantedMineCells.push(randCell);
      randCell.plantMine();
    }
  }
}

function setupMineCountOnCells(rows) {
  rows.forEach(function (row) {
    row.forEach(function (cell) {
      if (!utils.hasMine(cell)) {
        var count  = countSurroundingMines(cell, rows);
        cell.state = STATES['BOMBS' + count];
      }
    })
  })
}

function countSurroundingMines(pivotCell, rows) {
  var cellUpLeft    = utils.getCellUpLeft(pivotCell, rows);
  var cellUp        = utils.getCellUp(pivotCell, rows);
  var cellUpRight   = utils.getCellUpRight(pivotCell, rows);
  var cellLeft      = utils.getCellLeft(pivotCell, rows);
  var cellRight     = utils.getCellRight(pivotCell, rows);
  var cellDownLeft  = utils.getCellDownLeft(pivotCell, rows);
  var cellDown      = utils.getCellDown(pivotCell, rows);
  var cellDownRight = utils.getCellDownRight(pivotCell, rows);

  var minesNum = 0;
  if (utils.hasMine(cellUpLeft)) minesNum++;
  if (utils.hasMine(cellUp)) minesNum++;
  if (utils.hasMine(cellUpRight)) minesNum++;
  if (utils.hasMine(cellLeft)) minesNum++;
  if (utils.hasMine(cellRight)) minesNum++;
  if (utils.hasMine(cellDownLeft)) minesNum++;
  if (utils.hasMine(cellDown)) minesNum++;
  if (utils.hasMine(cellDownRight)) minesNum++;
  return minesNum;
}

module.exports = Table;