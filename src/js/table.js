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
var rows  = [];
var cells = [];

var defaults = {
  width: 10, height: 10, numMines: 10
};

Table.prototype.init = function (tableElement, width, height, numMines) {
  defaults.width    = width;
  defaults.height   = height;
  defaults.numMines = numMines;
  createCells(width, height);
  populateElements(tableElement, rows);
  plantMines(numMines);
  utils.setupMineCountOnCells(cells, rows);
};

Table.prototype.render = function () {
  render(rows);
};

function createCells(maxRowNum, maxColNum) {
  rows  = [];
  cells = [];
  for (var rowNum = 0; rowNum < maxRowNum; rowNum++) {
    var row = [];
    for (var colNum = 0; colNum < maxColNum; colNum++) {
      var cell = new Cell(rowNum, colNum);
      row.push(cell);
      cells.push(cell);
    }
    rows.push(row);
  }
}

function middleHit(cell) {
  utils.getNeigbouringCellsArray(cell, rows).forEach(function (neighbourCell) {
    neighbourCell && onMouseDown(1, neighbourCell);
  });
}

function middleHitEnd(cell) {
  var neighbours = utils.getNeigbouringCellsArray(cell, rows);
  var flagged    = neighbours.filter(function (neighbourCell) {
    return neighbourCell && neighbourCell.uiState === UI_STATES.FLAGGED
  });
  if (!cell.hasMine && flagged.length === cell.surroundingMinesCount) {
    neighbours.forEach(function (neighbourCell) {
      if (neighbourCell && neighbourCell.uiState !== UI_STATES.FLAGGED) {
        onMouseDown(1, neighbourCell);
        onMouseUp(1, neighbourCell);
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
      setupCellEvents(cell);


      rowElement.append(td);
    });
    tableElement.append(rowElement);
  });
}

function setupCellEvents(cell) {
  $(cell.getElement()).mousedown(function (event) {
    onMouseDown(event.which, cell);
  });
  $(cell.getElement()).mouseup(function (event) {
    onMouseUp(event.which, cell);
  });
  $(cell.getElement()).mouseleave(function () {
    onMouseLeave(cell);
  });
}


function onMouseDown(mouseKey, cell) {
  if (!cell.clicksAllowed) return;
  cell.previousUiState = cell.uiState;
  switch (mouseKey) {
    case 1:
      if (cell.uiState === UI_STATES.HIDDEN) {
        cell.uiState = UI_STATES.BEING_PRESSED;
        cell.render();
      }
      break;
    case 2:
      if (cell.uiState === UI_STATES.HIDDEN) {
        cell.uiState = UI_STATES.BEING_PRESSED;
        cell.render();
        middleHit(cell);
      } else if (cell.uiState === UI_STATES.UNCOVERED) {
        cell.render();
        middleHit(cell);
      }
      break;
  }
}

function lose(cells) {
  utils.blockClicks(cells);
  utils.uncoverAllMines(cells);
  $(".lose-message").show();
}

function win(cells) {
  utils.blockClicks(cells);
  $(".win-message").show();
}

function onMouseUp(mouseKey, cell) {
  if (!cell.clicksAllowed) return;
  switch (mouseKey) {
    case 1:
      if (cell.uiState === UI_STATES.BEING_PRESSED) {
        cell.uiState    = UI_STATES.UNCOVERED;
        //check if game ended
        var countHidden = 0;
        cells.forEach(function (cell) {
          if (cell.uiState === UI_STATES.HIDDEN || cell.uiState === UI_STATES.FLAGGED) {
            countHidden++;
          }
        });

        if (defaults.numMines === countHidden) {
          win(cells);
        } else {

          if (cell.hasMine) {
            cell.exploded = true;
            cell.render();
            lose(cells);
          } else if (cell.surroundingMinesCount === 0) {


            utils.getNeigbouringCellsArray(cell, rows).forEach(function (neighbourCell) {
              if (neighbourCell) {
                onMouseDown(1, neighbourCell);
                onMouseUp(1, neighbourCell);
              }
            });
          }
        }
        cell.render();
      }
      break;
    case 2:
      middleHitEnd(cell);
      break;
    case 3:
      if (cell.uiState === UI_STATES.FLAGGED) {
        cell.uiState = UI_STATES.HIDDEN;
        cell.render();
      } else if (cell.uiState === UI_STATES.HIDDEN) {
        cell.uiState = UI_STATES.FLAGGED;
        cell.render();
      }
      break;
  }
}

function onMouseLeave(cell) {
  if (!cell.clicksAllowed) return;
  if (cell.uiState === UI_STATES.BEING_PRESSED) {
    cell.uiState = UI_STATES.HIDDEN;
    cell.render();
  }
}


function render(rows) {
  rows.forEach(function (row) {
    row.forEach(function (cell) {
      cell.render();
    });
  });
}

function plantMines(numMines) {
  var minesPlanted = 0;
  var cellIndexes  = [];
  cells.forEach(function (cell, index) {
    cellIndexes.push(index);
  });
  while (minesPlanted < numMines) {
    var randIndex     = Math.floor(Math.random() * cellIndexes.length);
    var randCellIndex = cellIndexes.splice(randIndex, 1)[0];
    cells[randCellIndex].plantMine();
    minesPlanted++;
  }
}


module.exports = Table;