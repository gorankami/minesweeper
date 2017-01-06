var navigationService = {
  getCellUp               : getCellUp,
  getCellLeft             : getCellLeft,
  getCellRight            : getCellRight,
  getCellDown             : getCellDown,
  getCellUpLeft           : getCellUpLeft,
  getCellUpRight          : getCellUpRight,
  getCellDownLeft         : getCellDownLeft,
  getCellDownRight        : getCellDownRight,
  getNeigbouringCellsArray: getNeigbouringCellsArray,
  countSurroundingMines   : countSurroundingMines
};

module.exports = navigationService;

function getCellUp(pivotCell, cells, boardSize) {
  return pivotCell.rowNum !== 0 ? cells[((pivotCell.rowNum - 1) * boardSize) + pivotCell.colNum] : null;
}

function getCellLeft(pivotCell, cells, boardSize) {
  return pivotCell.colNum !== 0 ? cells[(pivotCell.rowNum * boardSize) + pivotCell.colNum - 1] : null;
}

function getCellRight(pivotCell, cells, boardSize) {
  return pivotCell.colNum < boardSize - 1 ? cells[(pivotCell.rowNum * boardSize) + pivotCell.colNum + 1] : null;
}

function getCellDown(pivotCell, cells, boardSize) {
  return pivotCell.rowNum < boardSize - 1 ? cells[((pivotCell.rowNum + 1) * boardSize) + pivotCell.colNum] : null;
}

function getCellUpLeft(pivotCell, cells, boardSize) {
  return pivotCell.rowNum !== 0 && pivotCell.colNum !== 0 ? cells[((pivotCell.rowNum - 1) * boardSize) + pivotCell.colNum - 1] : null;
}

function getCellUpRight(pivotCell, cells, boardSize) {
  return pivotCell.rowNum !== 0 && pivotCell.colNum < boardSize - 1 ? cells[((pivotCell.rowNum - 1) * boardSize) + pivotCell.colNum + 1] : null;
}

function getCellDownLeft(pivotCell, cells, boardSize) {
  return pivotCell.rowNum < boardSize - 1 && pivotCell.colNum !== 0 ? cells[((pivotCell.rowNum + 1) * boardSize) + pivotCell.colNum - 1] : null;
}

function getCellDownRight(pivotCell, cells, boardSize) {
  return pivotCell.rowNum < boardSize - 1 && pivotCell.colNum < boardSize - 1 ? cells[((pivotCell.rowNum + 1) * boardSize) + pivotCell.colNum + 1]  : null;
}

function getNeigbouringCellsArray(cell, cells, boardSize) {
  return [
    getCellUpLeft(cell, cells, boardSize),
    getCellUp(cell, cells, boardSize),
    getCellUpRight(cell, cells, boardSize),
    getCellLeft(cell, cells, boardSize),
    getCellRight(cell, cells, boardSize),
    getCellDownLeft(cell, cells, boardSize),
    getCellDown(cell, cells, boardSize),
    getCellDownRight(cell, cells, boardSize)
  ];
}

function countSurroundingMines(cell, cells, boardSize) {
  var minesNum = 0;
  getNeigbouringCellsArray(cell, cells, boardSize).forEach(function (neighbourCell) {
    neighbourCell && neighbourCell.hasMine && minesNum++;
  });
  return minesNum;
}

