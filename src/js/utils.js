var UI_STATES = require('./ui-states');

var utils = {
  getCellUp               : getCellUp,
  getCellLeft             : getCellLeft,
  getCellRight            : getCellRight,
  getCellDown             : getCellDown,
  getCellUpLeft           : getCellUpLeft,
  getCellUpRight          : getCellUpRight,
  getCellDownLeft         : getCellDownLeft,
  getCellDownRight        : getCellDownRight,
  getNeigbouringCellsArray: getNeigbouringCellsArray,
  countSurroundingMines   : countSurroundingMines,
  setupMineCountOnCells   : setupMineCountOnCells,
  uncoverAllMines         : uncoverAllMines,
  blockClicks             : blockClicks

};

module.exports = utils;

function getCellUp(pivotCell, rows) {
  return pivotCell.rowNum !== 0 ? rows[pivotCell.rowNum - 1][pivotCell.colNum] : null;
}

function getCellLeft(pivotCell, rows) {
  return pivotCell.colNum !== 0 ? rows[pivotCell.rowNum][pivotCell.colNum - 1] : null;
}

function getCellRight(pivotCell, rows) {
  return pivotCell.colNum < rows[0].length - 1 ? rows[pivotCell.rowNum][pivotCell.colNum + 1] : null;
}

function getCellDown(pivotCell, rows) {
  return pivotCell.rowNum < rows.length - 1 ? rows[pivotCell.rowNum + 1][pivotCell.colNum] : null;
}

function getCellUpLeft(pivotCell, rows) {
  return pivotCell.rowNum !== 0 && pivotCell.colNum !== 0 ? rows[pivotCell.rowNum - 1][pivotCell.colNum - 1] : null;
}

function getCellUpRight(pivotCell, rows) {
  return pivotCell.rowNum !== 0 && pivotCell.colNum < rows[0].length - 1 ? rows[pivotCell.rowNum - 1][pivotCell.colNum + 1] : null;
}

function getCellDownLeft(pivotCell, rows) {
  return pivotCell.rowNum < rows.length - 1 && pivotCell.colNum !== 0 ? rows[pivotCell.rowNum + 1][pivotCell.colNum - 1] : null;
}

function getCellDownRight(pivotCell, rows) {
  return pivotCell.rowNum < rows.length - 1 && pivotCell.colNum < rows[0].length - 1 ? rows[pivotCell.rowNum + 1][pivotCell.colNum + 1] : null;
}

function getNeigbouringCellsArray(cell, rows) {
  return [
    getCellUpLeft(cell, rows),
    getCellUp(cell, rows),
    getCellUpRight(cell, rows),
    getCellLeft(cell, rows),
    getCellRight(cell, rows),
    getCellDownLeft(cell, rows),
    getCellDown(cell, rows),
    getCellDownRight(cell, rows)
  ];
}

function countSurroundingMines(cell, rows) {
  var minesNum = 0;
  getNeigbouringCellsArray(cell, rows).forEach(function (neighbourCell) {
    neighbourCell && neighbourCell.hasMine && minesNum++;
  });
  return minesNum;
}

function setupMineCountOnCells(cells, rows) {
  cells.forEach(function (cell) {
    if (!cell.hasMine) {
      cell.surroundingMinesCount = countSurroundingMines(cell, rows);
    }
  });
}


function uncoverAllMines(cells) {
  cells.forEach(function (cell) {
    if (cell.hasMine) {
      cell.uiState = UI_STATES.UNCOVERED;
      cell.render();
    }
  });
}

function blockClicks(cells) {
  cells.forEach(function (cell) {
    cell.blockClicks();
  });
}