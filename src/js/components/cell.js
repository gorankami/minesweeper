var iconService = require("./../services/icon"),
    UI_STATES   = require("./../enums/ui-states");

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
}

/**
 * Singleton for cell element
 * @returns {jQuery|HTMLElement|*}
 */
Cell.prototype.getElement = function ($) {
  if (!this.cellElement) {
    this.cellElement = $('<div></div>');
  }
  return this.cellElement;
};

Cell.prototype.render = function ($) {
  var icon    = iconService.getIconForCell(this);
  var element = this.getElement($);
  $(element).css('background-image', 'url(' + icon + ')');
  return element;
};


Cell.prototype.plantMine = function () {
  this.hasMine = true;
};

Cell.prototype.revertState = function () {
  this.uiState = this.previousUiState;
};

Cell.prototype.changeState = function (newState) {
  this.previousUiState = this.uiState;
  this.uiState         = newState;
};

Cell.prototype.tryPeek = function () {
  if (this.uiState === UI_STATES.HIDDEN) {
    this.changeState(UI_STATES.BEING_PRESSED);
    return true;
  } else {
    return false;
  }
};

Cell.prototype.toggleFlag = function () {
  if (this.uiState === UI_STATES.FLAGGED) {
    this.changeState(UI_STATES.HIDDEN);
  } else if (this.uiState === UI_STATES.HIDDEN) {
    this.changeState(UI_STATES.FLAGGED);
  }
};

Cell.prototype.tryUncover = function () {
  if (this.uiState === UI_STATES.BEING_PRESSED) {
    this.changeState(UI_STATES.UNCOVERED);
    return true;
  } else {
    return false;
  }
};

Cell.prototype.explode = function () {
  this.exploded = true;
};

module.exports = Cell;



