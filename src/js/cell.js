var $         = require("jquery"),
    icons     = require("./icons"),
    utils     = require("./utils"),
    UI_STATES = require("./ui-states");

/**
 * Cell component
 * Initialized with coordinates, cell component encapsulates cell state, allows click events and keeps mine data
 * @param rowNum
 * @param colNum
 * @constructor
 */
function Cell(rowNum, colNum) {
  this.rowNum                = rowNum;
  this.colNum                = colNum;
  this.uiState               = UI_STATES.HIDDEN;
  this.previousUiState       = UI_STATES.HIDDEN;
  this.surroundingMinesCount = 0;
  this.hasMine               = false;
  this.exploded              = false;
  this.clicksAllowed         = true;
}

Cell.prototype.getElement = function () {
  if (!this.cellElement) {
    this.cellElement = $('<div/></div>');
    var cell         = this;
    $(this.cellElement).mousedown(function (event) {
      onMouseDown(event.which, cell);
    });
    $(this.cellElement).mouseup(function (event) {
      onMouseUp(event.which, cell);
    });
    $(this.cellElement).mouseleave(function () {
      onMouseLeave(cell);
    });
  }
  return this.cellElement;
};

Cell.prototype.render = function () {
  var icon = utils.getIconForCellState(this);
  $(this.cellElement).css('background-image', 'url(' + icon + ')');
};

Cell.prototype.setCallbackForClearCellHit = function (callback) {
  this.onClearCellHit = callback;
};

Cell.prototype.setCallbackForMineHit = function (callback) {
  this.onMineHit = callback;
};

Cell.prototype.setCallbackMiddleClick = function (callback) {
  this.onMiddleBeingHit = callback;
};

Cell.prototype.setCallbackMiddleClickEnd = function (callback) {
  this.onMiddleBeingHitEnd = callback;
};


Cell.prototype.plantMine = function () {
  this.hasMine = true;
};

Cell.prototype.blockClicks = function () {
  this.clicksAllowed = false;
};


Cell.prototype.forceLeftDown = function () {
  onMouseDown(1, this);
};

Cell.prototype.forceLeftUp = function () {
  onMouseUp(1, this);
};

Cell.prototype.cancelStateChange = function () {
  this.uiState = this.previousUiState;
  this.render();
};

module.exports = Cell;

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
        cell.onMiddleBeingHit(cell);
      } else if (cell.uiState === UI_STATES.UNCOVERED) {
        cell.render();
        cell.onMiddleBeingHit(cell);
      }
      break;
  }
}

function onMouseUp(mouseKey, cell) {
  if (!cell.clicksAllowed) return;
  switch (mouseKey) {
    case 1:
      if (cell.uiState === UI_STATES.BEING_PRESSED) {
        cell.uiState = UI_STATES.UNCOVERED;
        if (cell.hasMine) {
          cell.exploded = true;
          if (cell.onMineHit && typeof cell.onMineHit === 'function') {
            cell.onMineHit();
          }
        } else if (cell.surroundingMinesCount === 0) {
          if (cell.onClearCellHit && typeof cell.onClearCellHit === 'function') {
            cell.onClearCellHit(cell);
          }
        }
        cell.render();
      }
      break;
    case 2:
      cell.onMiddleBeingHitEnd(cell);
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


