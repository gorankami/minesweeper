var $         = require("jquery"),
    utils     = require("./utils"),
    UI_STATES = require("./ui-states"),
    Cell      = require("./cell");

/**
 * Table component
 * @desc Contains cells in rows and allows cell navigation and control
 * @constructor
 */
function Table() {
}
var rows = [];

Table.prototype.init = function (tableElement, m, n, numMines) {
  rows = createTableCells(m, n);
  populateElements(tableElement, rows);
  plantMines(rows, numMines);
  setupMineCountOnCells(rows);
};

//useful for tests
Table.setupMineCountOnCells = setupMineCountOnCells;
Table.countSurroundingMines = countSurroundingMines;

Table.prototype.render = function () {
  render(rows);
};

function createTableCells(maxRowNum, maxColNum) {
  var rows = [];
  for (var rowNum = 0; rowNum < maxRowNum; rowNum++) {
    var row = [];
    for (var colNum = 0; colNum < maxColNum; colNum++) {
      var cell = new Cell(rowNum, colNum);
      cell.setCallbackForClearCellHit(clearCellHit);
      cell.setCallbackForMineHit(mineHit);
      cell.setCallbackMiddleClick(middleHit);
      cell.setCallbackMiddleClickEnd(middleHitEnd);
      row.push(cell);
    }
    rows.push(row);
  }
  return rows;
}

function clearCellHit(cell) {
  utils.getNeigbouringCellsArray(cell, rows).forEach(function (neighbourCell) {
    if (neighbourCell) {
      neighbourCell.forceLeftDown();
      neighbourCell.forceLeftUp();
    }
  });
}


function mineHit() {
  rows.forEach(function (row) {
    row.forEach(function (cell) {
      cell.blockClicks();
      if (cell.hasMine) {
        cell.uiState = UI_STATES.UNCOVERED;
        cell.render();
      }
    });
  });
}

function middleHit(cell) {
  utils.getNeigbouringCellsArray(cell, rows).forEach(function (neighbourCell) {
    neighbourCell && neighbourCell.forceLeftDown();
  });
}

function middleHitEnd(cell) {
  var neighbours = utils.getNeigbouringCellsArray(cell, rows);
  var flagged    = neighbours.filter(function (neighbourCell) {
    return neighbourCell && neighbourCell.uiState === UI_STATES.FLAGGED
  });
  if (flagged.length === cell.surroundingMinesCount) {
    neighbours.forEach(function (neighbourCell) {
      if (neighbourCell && neighbourCell.uiState !== UI_STATES.FLAGGED) {
        neighbourCell.forceLeftUp();
        neighbourCell.forceLeftDown();
      }
    });
  } else {
    neighbours.forEach(function (neighbourCell) {
      neighbourCell && neighbourCell.cancelStateChange();
    });
  }
}


function populateElements(tableElement, rows) {
  tableElement.empty();
  rows.forEach(function (row) {
    var rowElement = $('<tr></tr>');
    row.forEach(function (cell) {
      var td = $('<td></td>');
      td.append(cell.getElement());
      rowElement.append(td);
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
      if (!cell.hasMine) {
        cell.surroundingMinesCount = countSurroundingMines(cell, rows);
      }
    });
  });
}

function countSurroundingMines(cell, rows) {
  var minesNum = 0;
  utils.getNeigbouringCellsArray(cell, rows).forEach(function (neighbourCell) {
    neighbourCell && neighbourCell.hasMine && minesNum++;
  });
  return minesNum;
}

module.exports = Table;