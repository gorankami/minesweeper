var $         = require("jquery"),
    icons     = require("./icons"),
    UI_STATES = require("./ui-states");

function Cell(rowNum, colNum) {
  this.rowNum                = rowNum;
  this.colNum                = colNum;
  this.uiState               = UI_STATES.HIDDEN;
  this.surroundingMinesCount = 0;
  this.hasMine               = false;
  this.exploded              = false;
  this.clicksAllowed         = true;
}

Cell.prototype.getElement = function () {
  if (!this.cellElement) {
    this.cellElement = $('<div/></div>');
    setupEvents(this.cellElement, this);
  }
  return this.cellElement;
};

Cell.prototype.render = function () {
  var icon = getIconForCellState(this);
  $(this.cellElement).css('background-image', 'url(' + icon + ')');
};

Cell.prototype.setCallbackForClearCellHit = function (callback) {
  this.onClearCellHit = callback;
};

Cell.prototype.setCallbackForMineHit = function (callback) {
  this.onMineHit = callback;
};

Cell.prototype.plantMine = function () {
  this.hasMine = true;
};

Cell.prototype.blockClicks = function () {
  this.clicksAllowed = false;
};


function getIconForCellState(cell) {
  switch (cell.uiState) {
    case UI_STATES.BEING_PRESSED:
      return icons.pressed;
    case UI_STATES.FLAGGED:
      return icons.flag;
    case UI_STATES.UNCOVERED:
      if (cell.exploded) {
        return icons.explodedBomb;
      } else if (cell.hasMine) {
        return icons.exposedBomb;
      } else {
        return icons.bombs[cell.surroundingMinesCount];
      }
    case UI_STATES.HIDDEN:
    default:
      return icons.blank;
  }
}

function setupEvents(element, cell) {
  $(element).mousedown(mousedown);
  $(element).mouseup(mouseup);
  $(element).mouseleave(mouseleave);

  function mousedown(event) {
    if (!cell.clicksAllowed) return;
    if (event.which == 1 && cell.uiState === UI_STATES.HIDDEN) {
      cell.uiState = UI_STATES.BEING_PRESSED;
      cell.render();
    }
  }

  function mouseup(event) {
    if (!cell.clicksAllowed) return;
    if (event.which == 1) {
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
    } else if (event.which == 3) {
      if (cell.uiState === UI_STATES.FLAGGED) {
        cell.uiState = UI_STATES.HIDDEN;
        cell.render();
      } else if (cell.uiState === UI_STATES.HIDDEN) {
        cell.uiState = UI_STATES.FLAGGED;
        cell.render();
      }
    }
  }

  function mouseleave() {
    if (!cell.clicksAllowed) return;
    if (cell.uiState === UI_STATES.BEING_PRESSED) {
      cell.uiState = UI_STATES.HIDDEN;
      cell.render();
    }
  }
}

module.exports = Cell;

