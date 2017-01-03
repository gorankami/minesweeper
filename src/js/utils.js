var UI_STATES = require('./ui-states');

var utils = {
  rand                    : rand,
  getCellUp               : getCellUp,
  getCellLeft             : getCellLeft,
  getCellRight            : getCellRight,
  getCellDown             : getCellDown,
  getCellUpLeft           : getCellUpLeft,
  getCellUpRight          : getCellUpRight,
  getCellDownLeft         : getCellDownLeft,
  getCellDownRight        : getCellDownRight,
  getNeigbouringCellsArray: getNeigbouringCellsArray
};

module.exports = utils;

function rand(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getCellUp(pivotCell, rows) {
  return pivotCell.rowNum !== 0 ? rows[pivotCell.rowNum - 1][pivotCell.colNum] : null;
}

function getCellLeft(pivotCell, rows) {
  return pivotCell.colNum !== 0 ? rows[pivotCell.rowNum][pivotCell.colNum - 1] : null;
}

function getCellRight(pivotCell, rows) {
  return pivotCell.colNum < rows[0].length - 1 ? rows[pivotCell.rowNum][pivotCell.colNum + 1] : null;
}

function getCellDown(pivotCell, rows) {
  return pivotCell.rowNum < rows.length - 1 ? rows[pivotCell.rowNum + 1][pivotCell.colNum] : null;
}

function getCellUpLeft(pivotCell, rows) {
  return pivotCell.rowNum !== 0 && pivotCell.colNum !== 0 ? rows[pivotCell.rowNum - 1][pivotCell.colNum - 1] : null;
}

function getCellUpRight(pivotCell, rows) {
  return pivotCell.rowNum !== 0 && pivotCell.colNum < rows[0].length - 1 ? rows[pivotCell.rowNum - 1][pivotCell.colNum + 1] : null;
}

function getCellDownLeft(pivotCell, rows) {
  return pivotCell.rowNum < rows.length - 1 && pivotCell.colNum !== 0 ? rows[pivotCell.rowNum + 1][pivotCell.colNum - 1] : null;
}

function getCellDownRight(pivotCell, rows) {
  return pivotCell.rowNum < rows.length - 1 && pivotCell.colNum < rows[0].length - 1 ? rows[pivotCell.rowNum + 1][pivotCell.colNum + 1] : null;
}

function getNeigbouringCellsArray(cell, rows) {
  return [
    getCellUpLeft(cell, rows),
    getCellUp(cell, rows),
    getCellUpRight(cell, rows),
    getCellLeft(cell, rows),
    getCellRight(cell, rows),
    getCellDownLeft(cell, rows),
    getCellDown(cell, rows),
    getCellDownRight(cell, rows)
  ]
}