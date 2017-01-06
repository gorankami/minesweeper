var $                 = require("jquery"),
    iconService       = require("./services/icon"),
    settingsService   = require("./services/settings"),
    navigationService = require("./services/navigation"),
    UI_STATES         = require("./enums/ui-states"),
    Table             = require("./components/table");


//DOM Elements
var fieldGridSize  = $("input#grid-size"),
    fieldNumMines  = $("input#num-mines"),
    btnStart       = $("#btn-start"),
    msgWin         = $(".win-message"),
    msgLose        = $(".lose-message"),
    tableContainer = $('#table-container');

//Initialization
var table = new Table();
iconService.cacheIcons();
fieldGridSize.val(settingsService.size);
fieldNumMines.val(settingsService.minesCount);
btnStart.click(newGame);
newGame();

/**
 * Clears the board and populates cells, depending on provided size and mine number
 */
function newGame() {
  msgWin.hide();
  msgLose.hide();
  var size       = Number(fieldGridSize.val());
  var minesCount = Number(fieldNumMines.val());

  if (minesCount >= size * size) {
    alert("Are you insane? Pick less mines if you want to live!");
  } else {
    settingsService.init(size, minesCount);
    table.init(size, minesCount);
    var tableElement = table.render();
    tableContainer.empty();
    tableContainer.append(tableElement);
    setupCellEvents(table.getCells());
  }
}

function setupCellEvents(cells) {
  cells.forEach(function (cell) {
    $(cell.getElement()).mousedown(function (event) {
      onMouseDown(event.which, cell);
    });
    $(cell.getElement()).mouseup(function (event) {
      onMouseUp(event.which, cell);
    });
    $(cell.getElement()).mouseleave(function () {
      onMouseLeave(cells);
    });
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
        table.getCells().forEach(function (cell) {
          if (cell.uiState === UI_STATES.HIDDEN || cell.uiState === UI_STATES.FLAGGED) {
            countHidden++;
          }
        });

        if (settingsService.minesCount === countHidden) {
          win(table.getCells());
        } else {

          if (cell.hasMine) {
            cell.exploded = true;
            cell.render();
            lose(table.getCells());
          } else if (cell.surroundingMinesCount === 0) {
            navigationService.getNeigbouringCellsArray(cell, table.getRows()).forEach(function (neighbourCell) {
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

function onMouseLeave(cells) {
  if (!settingsService.clicksEnabled) return;
  cells.forEach(function (cell) {
    if (cell.uiState === UI_STATES.BEING_PRESSED) {
      cell.uiState = UI_STATES.HIDDEN;
      cell.render();
    }
  });
}


function middleHit(cell) {
  navigationService.getNeigbouringCellsArray(cell, table.getRows()).forEach(function (neighbourCell) {
    neighbourCell && onMouseDown(1, neighbourCell);
  });
}

function middleHitEnd(cell) {
  var neighbours = navigationService.getNeigbouringCellsArray(cell, table.getRows());
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