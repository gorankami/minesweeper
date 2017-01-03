var $      = require('jquery'),
    STATES = require('./states');

var utils = {
  rand            : rand,
  hasMine         : hasMine,
  getCellUp       : getCellUp,
  getCellLeft     : getCellLeft,
  getCellRight    : getCellRight,
  getCellDown     : getCellDown,
  getCellUpLeft   : getCellUpLeft,
  getCellUpRight  : getCellUpRight,
  getCellDownLeft : getCellDownLeft,
  getCellDownRight: getCellDownRight
};

module.exports = utils;

function rand(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function hasMine(cell) {
  return !!(cell && cell.state === STATES.EXPOSEDBOMB);
}

function getCellUp(pivotCell, rows) {
  return pivotCell.y !== 0 ? rows[pivotCell.y - 1][pivotCell.x] : null;
}

function getCellLeft(pivotCell, rows) {
  return pivotCell.x !== 0 ? rows[pivotCell.y][pivotCell.x - 1] : null;
}

function getCellRight(pivotCell, rows) {
  return pivotCell.x < rows[0].length - 1 ? rows[pivotCell.y][pivotCell.x + 1] : null;
}

function getCellDown(pivotCell, rows) {
  return pivotCell.y < rows.length - 1 ? rows[pivotCell.y + 1][pivotCell.x] : null;
}

function getCellUpLeft(pivotCell, rows) {
  return pivotCell.y !== 0 && pivotCell.x !== 0 ? rows[pivotCell.y - 1][pivotCell.x-1] : null;
}

function getCellUpRight(pivotCell, rows) {
  return pivotCell.y !== 0 && pivotCell.x < rows[0].length - 1 ? rows[pivotCell.y - 1][pivotCell.x+1] : null;
}

function getCellDownLeft(pivotCell, rows) {
  return pivotCell.y < rows.length - 1 && pivotCell.x !== 0 ? rows[pivotCell.y + 1][pivotCell.x-1] : null;
}

function getCellDownRight(pivotCell, rows) {
  return pivotCell.y < rows.length - 1 &&  pivotCell.x < rows[0].length - 1 ? rows[pivotCell.y + 1][pivotCell.x+1] : null;
}
