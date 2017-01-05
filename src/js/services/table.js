var $                 = require("jquery"),
    navigationService = require("./navigation"),
    UI_STATES         = require("./../ui-states"),
    settingsService   = require("./settings"),
    Cell              = require("./../cell");


var rows  = [];
var cells = [];

var tableService = {
  init                 : init,
  render               : render,
  setupMineCountOnCells: setupMineCountOnCells
};

module.exports = tableService;

function init(tableElement, size, numMines) {
  createCells(size);
  populateElements(tableElement, rows);
  plantMines(numMines);
  setupMineCountOnCells(cells, rows);
}


function setupMineCountOnCells(cells, rows) {
  cells.forEach(function (cell) {
    if (!cell.hasMine) {
      cell.surroundingMinesCount = navigationService.countSurroundingMines(cell, rows);
    }
  });
}

function createCells(size) {
  rows  = [];
  cells = [];
  for (var rowNum = 0; rowNum < size; rowNum++) {
    var row = [];
    for (var colNum = 0; colNum < size; colNum++) {
      var cell = new Cell(rowNum, colNum);
      row.push(cell);
      cells.push(cell);
    }
    rows.push(row);
  }
}

function middleHit(cell) {
  navigationService.getNeigbouringCellsArray(cell, rows).forEach(function (neighbourCell) {
    neighbourCell && onMouseDown(1, neighbourCell);
  });
}

function middleHitEnd(cell) {
  var neighbours = navigationService.getNeigbouringCellsArray(cell, rows);
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
      if (neighbourCell) {
        neighbourCell.cancelStateChange();
        neighbourCell.render();
      }
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
  if (!settingsService.clicksEnabled) return;
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
  settingsService.clicksEnabled = false;
  cells.forEach(function (cell) {
    if (cell.hasMine) {
      cell.uiState = UI_STATES.UNCOVERED;
      cell.render();
    }
  });
  $(".lose-message").show();
}

function win() {
  settingsService.clicksEnabled = false;
  $(".win-message").show();
}

function onMouseUp(mouseKey, cell) {
  if (!settingsService.clicksEnabled) return;
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

        if (settingsService.minesCount === countHidden) {
          win(cells);
        } else {

          if (cell.hasMine) {
            cell.exploded = true;
            cell.render();
            lose(cells);
          } else if (cell.surroundingMinesCount === 0) {
            navigationService.getNeigbouringCellsArray(cell, rows).forEach(function (neighbourCell) {
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
  if (!settingsService.clicksEnabled) return;
  if (cell.uiState === UI_STATES.BEING_PRESSED) {
    cell.uiState = UI_STATES.HIDDEN;
    cell.render();
  }
}


function render() {
  cells.forEach(function (cell) {
    cell.render();
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
