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

Cell.prototype.forceLeftClick = function () {
  onMouseDown(1, this);
  onMouseUp(1, this);
};

module.exports = Cell;


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
  $(element).mousedown(function (event) {
    onMouseDown(event.which, cell);
  });
  $(element).mouseup(function (event) {
    onMouseUp(event.which, cell);
  });
  $(element).mouseleave(function (event) {
    onMouseLeave(cell);
  });
}

function onMouseDown(mouseKey, cell) {
  if (!cell.clicksAllowed) return;
  if (mouseKey == 1 && cell.uiState === UI_STATES.HIDDEN) {
    cell.uiState = UI_STATES.BEING_PRESSED;
    cell.render();
  }
}

function onMouseUp(mouseKey, cell) {
  if (!cell.clicksAllowed) return;
  if (mouseKey == 1) {
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
  } else if (mouseKey == 3) {
    if (cell.uiState === UI_STATES.FLAGGED) {
      cell.uiState = UI_STATES.HIDDEN;
      cell.render();
    } else if (cell.uiState === UI_STATES.HIDDEN) {
      cell.uiState = UI_STATES.FLAGGED;
      cell.render();
    }
  }
}

function onMouseLeave(cell) {
  if (!cell.clicksAllowed) return;
  if (cell.uiState === UI_STATES.BEING_PRESSED) {
    cell.uiState = UI_STATES.HIDDEN;
    cell.render();
  }
}


