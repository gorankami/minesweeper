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
  }
  return this.cellElement;
};

Cell.prototype.render = function () {
  var icon = utils.getIconForCellState(this);
  $(this.cellElement).css('background-image', 'url(' + icon + ')');
};


Cell.prototype.plantMine = function () {
  this.hasMine = true;
};

Cell.prototype.blockClicks = function () {
  this.clicksAllowed = false;
};

Cell.prototype.cancelStateChange = function () {
  this.uiState = this.previousUiState;
  this.render();
};

module.exports = Cell;



