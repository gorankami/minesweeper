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
var isFirstClick = false;
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
  if (size < 10 || size > 40) {
    alert("Pick a size between 10 and 40.");
  } else if (minesCount < 10 || minesCount > 500) {
    alert("You can plant up to 500 mines, but not less than 10.");
  } else if (minesCount >= size * size) {
    alert("That amount of mines doesn't fit the board size. Pick less mines, or create a bigger board");
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
  isFirstClick = true;
  cells.forEach(function (cell) {
    $(cell.getElement()).mousedown(function (event) {
      if (!settingsService.clicksEnabled) return;
      switch (event.which) {
        case 1:
          //left click down
          //planting mines only on first click in the game, this prevents that the first hit is a mine
          if(isFirstClick){
            table.plantMines(settingsService.minesCount, cell);
            isFirstClick = false;
          }
          cell.tryPeek();
          cell.render();
          break;
        case 2:
          //middle click down
          middleClickDown(cell);
          break;
      }
    });
    $(cell.getElement()).mouseup(function (event) {
      if (!settingsService.clicksEnabled) return;
      switch (event.which) {
        case 1:
          leftClickUp(cell);
          break;
        case 2:
          middleClickUp(cell);
          break;
        case 3:
          //right click up
          cell.toggleFlag();
          cell.render();
          break;
      }
    });
    $(cell.getElement()).mouseleave(function () {
      if (!settingsService.clicksEnabled) return;
      cells.forEach(function (cell) {
        if (cell.uiState === UI_STATES.BEING_PRESSED) {
          cell.changeState(UI_STATES.HIDDEN);
          cell.render();
        }
      });
    });
  });
}

function middleClickDown(cell) {
  if (cell.uiState === UI_STATES.HIDDEN) {
    cell.changeState(UI_STATES.BEING_PRESSED);
    cell.render();
    chainPeek(cell);
  } else if (cell.uiState === UI_STATES.UNCOVERED) {
    cell.render();
    chainPeek(cell);
  }
}

function chainPeek(cell, alsoUncover) {
  navigationService.getNeigbouringCellsArray(cell, table.getRows()).forEach(function (neighbourCell) {
    if (neighbourCell && settingsService.clicksEnabled) {
      neighbourCell.tryPeek();
      neighbourCell.render();
      if (alsoUncover) {
        leftClickUp(neighbourCell);
      }
    }
  });
}

function leftClickUp(cell) {
  if (cell.tryUncover()) {
    if (hasWon(table.getCells())) {
      win(table.getCells());
    } else {

      if (cell.hasMine) {
        cell.explode();
        lose(table.getCells());
      } else if (cell.surroundingMinesCount === 0) {
        chainPeek(cell, true);
      }
    }
    cell.render();
  }
  if (cell.uiState === UI_STATES.BEING_PRESSED) {
    cell.changeState(UI_STATES.UNCOVERED);
  }
}

function hasWon(cells) {
  var countHidden = 0;
  cells.forEach(function (cell) {
    if (cell.uiState === UI_STATES.HIDDEN || cell.uiState === UI_STATES.FLAGGED) {
      countHidden++;
    }
  });

  return settingsService.minesCount === countHidden;
}

function middleClickUp(cell) {
  var neighbours = navigationService.getNeigbouringCellsArray(cell, table.getRows());
  var flagged    = neighbours.filter(function (neighbourCell) {
    return neighbourCell && neighbourCell.uiState === UI_STATES.FLAGGED;
  });
  if (!cell.hasMine && flagged.length === cell.surroundingMinesCount && cell.uiState === UI_STATES.UNCOVERED) {
    neighbours.forEach(function (neighbourCell) {
      if (neighbourCell && neighbourCell.uiState !== UI_STATES.FLAGGED && settingsService.clicksEnabled) {
        neighbourCell.tryPeek();
        neighbourCell.render();
        leftClickUp(neighbourCell);
      }
    });
  } else {
    if (cell.uiState === UI_STATES.BEING_PRESSED) {
      cell.revertState();
      cell.render();
    }
    neighbours.forEach(function (neighbourCell) {
      if (neighbourCell && neighbourCell.uiState === UI_STATES.BEING_PRESSED) {
        neighbourCell.revertState();
        neighbourCell.render();
      }
    });
  }
}


function lose(cells) {
  settingsService.clicksEnabled = false;
  cells.forEach(function (cell) {
    if (cell.hasMine) {
      cell.changeState(UI_STATES.UNCOVERED);
      cell.render();
    }
  });
  msgLose.show();
}

function win() {
  settingsService.clicksEnabled = false;
  msgWin.show();
}