const $ = require("jquery"),
  iconService = require("./services/icon"),
  settingsService = require("./services/settings"),
  navigationService = require("./services/navigation"),
  UI_STATES = require("./enums/ui-states"),
  Table = require("./components/table");

//DOM Elements
const selectDifficulty = $("select#selectDifficulty"),
  btnStart = $("#btn-start"),
  msgWin = $(".win-message"),
  msgLose = $(".lose-message"),
  tableContainer = $('#table-container');

//Initialization
var table = new Table();
var isFirstClick = false;
iconService.cacheIcons();
btnStart.click(newGame);
$("#btn-easy").click(() => newGame("easy"));
$("#btn-medium").click(() => newGame("medium"));
$("#btn-hard").click(() => newGame("hard"));
newGame();

/**
 * Clears the board and populates cells, depending on provided size and mine number
 */
function newGame(difficulty) {
  settingsService.init(difficulty);
  table.init(settingsService.size, settingsService.minesCount);
  var tableElement = table.render($);
  tableContainer.empty();
  tableContainer.append(tableElement);
  setupCellEvents(table.getCells());


  msgWin.hide();
  msgLose.hide();
  const newCss = {
    "line-height": 16 * settingsService.size + "px",
    width: 16 * settingsService.size
  };
  msgWin.css(newCss);
  msgLose.css(newCss);
  refreshFlagCount();
}

function refreshFlagCount() {
  $("#flag-count").empty();
  $("#flag-count").append(settingsService.minesCount - settingsService.flagsCount);
}

function setupCellEvents(cells) {
  isFirstClick = true;
  cells.forEach(function (cell) {
    $(cell.getElement($)).mousedown(function (event) {
      if (!settingsService.clicksEnabled) return;
      switch (event.which) {
        case 1:
          //left click down
          //planting mines only on first click in the game, this prevents that the first hit is a mine
          if (isFirstClick) {
            table.plantMines(settingsService.minesCount, cell);
            isFirstClick = false;
          }
          cell.tryPeek();
          cell.render($);
          break;
        case 2:
          //middle click down
          middleClickDown(cell);
          break;
      }
    });
    $(cell.getElement($)).mouseup(function (event) {
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
          cell.render($);
          refreshFlagCount();
          break;
      }
    });
    $(cell.getElement($)).mouseleave(function () {
      if (!settingsService.clicksEnabled) return;
      cells.forEach(function (cell) {
        if (cell.uiState === UI_STATES.BEING_PRESSED) {
          cell.changeState(UI_STATES.HIDDEN);
          cell.render($);
        }
      });
    });
  });
}

function middleClickDown(cell) {
  if (cell.uiState === UI_STATES.HIDDEN) {
    cell.changeState(UI_STATES.BEING_PRESSED);
    cell.render($);
    chainPeek(cell);
  } else if (cell.uiState === UI_STATES.UNCOVERED) {
    cell.render($);
    chainPeek(cell);
  }
}

function chainPeek(cell, alsoUncover) {
  navigationService.getNeigbouringCellsArray(cell, table.getCells(), settingsService.size).forEach(function (neighbourCell) {
    if (neighbourCell && settingsService.clicksEnabled) {
      neighbourCell.tryPeek();
      neighbourCell.render($);
      if (alsoUncover) {
        leftClickUp(neighbourCell);
      }
    }
  });
}

function leftClickUp(cell) {
  if (cell.tryUncover()) {
    if (cell.hasMine) {
      cell.explode();
      lose(table.getCells());
    } else if (hasWon(table.getCells())) {
      win(table.getCells());
    } else if (cell.surroundingMinesCount === 0) {
      chainPeek(cell, true);
    }
    cell.render($);
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
  var neighbours = navigationService.getNeigbouringCellsArray(cell, table.getCells(), settingsService.size);
  var flagged = neighbours.filter(function (neighbourCell) {
    return neighbourCell && neighbourCell.uiState === UI_STATES.FLAGGED;
  });
  if (!cell.hasMine && flagged.length === cell.surroundingMinesCount && cell.uiState === UI_STATES.UNCOVERED) {
    neighbours.forEach(function (neighbourCell) {
      if (neighbourCell && neighbourCell.uiState !== UI_STATES.FLAGGED && settingsService.clicksEnabled) {
        neighbourCell.tryPeek();
        neighbourCell.render($);
        leftClickUp(neighbourCell);
      }
    });
  } else {
    if (cell.uiState === UI_STATES.BEING_PRESSED) {
      cell.revertState();
      cell.render($);
    }
    neighbours.forEach(function (neighbourCell) {
      if (neighbourCell && neighbourCell.uiState === UI_STATES.BEING_PRESSED) {
        neighbourCell.revertState();
        neighbourCell.render($);
      }
    });
  }
}

function lose(cells) {
  settingsService.clicksEnabled = false;
  cells.forEach(function (cell) {
    if (cell.hasMine) {
      cell.changeState(UI_STATES.UNCOVERED);
      cell.render($);
    }
  });
  msgLose.show();
}

function win() {
  settingsService.clicksEnabled = false;
  msgWin.show();
}