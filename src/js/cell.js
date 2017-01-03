var $      = require("jquery"),
    STATES = require("./states");

function Cell(rowNum, colNum) {
  this.rowNum     = rowNum;
  this.colNum     = colNum;
  this.state = STATES.BLANK;
}


Cell.prototype.getElement = function () {
  if (!this.cellElement) {
    this.cellElement = $('<td></td>');
  }
  return this.cellElement;
};

Cell.prototype.render = function () {
  this.cellElement.html(this.state);
};

Cell.prototype.plantMine = function () {
  this.state = STATES.EXPOSEDBOMB;
};

module.exports = Cell;

