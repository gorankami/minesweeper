import { Cell } from "../Cell";

export function getCellUp(
  pivotCell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return pivotCell.rowNum !== 0
    ? cells[(pivotCell.rowNum - 1) * boardSize + pivotCell.colNum]
    : null;
}

export function getCellLeft(
  pivotCell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return pivotCell.colNum !== 0
    ? cells[pivotCell.rowNum * boardSize + pivotCell.colNum - 1]
    : null;
}

export function getCellRight(
  pivotCell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return pivotCell.colNum < boardSize - 1
    ? cells[pivotCell.rowNum * boardSize + pivotCell.colNum + 1]
    : null;
}

export function getCellDown(
  pivotCell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return pivotCell.rowNum < boardSize - 1
    ? cells[(pivotCell.rowNum + 1) * boardSize + pivotCell.colNum]
    : null;
}

export function getCellUpLeft(
  pivotCell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return pivotCell.rowNum !== 0 && pivotCell.colNum !== 0
    ? cells[(pivotCell.rowNum - 1) * boardSize + pivotCell.colNum - 1]
    : null;
}

export function getCellUpRight(
  pivotCell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return pivotCell.rowNum !== 0 && pivotCell.colNum < boardSize - 1
    ? cells[(pivotCell.rowNum - 1) * boardSize + pivotCell.colNum + 1]
    : null;
}

export function getCellDownLeft(
  pivotCell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return pivotCell.rowNum < boardSize - 1 && pivotCell.colNum !== 0
    ? cells[(pivotCell.rowNum + 1) * boardSize + pivotCell.colNum - 1]
    : null;
}

export function getCellDownRight(
  pivotCell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return pivotCell.rowNum < boardSize - 1 && pivotCell.colNum < boardSize - 1
    ? cells[(pivotCell.rowNum + 1) * boardSize + pivotCell.colNum + 1]
    : null;
}

export function getNeigbouringCellsArray(
  cell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  return [
    getCellUpLeft(cell, cells, boardSize),
    getCellUp(cell, cells, boardSize),
    getCellUpRight(cell, cells, boardSize),
    getCellLeft(cell, cells, boardSize),
    getCellRight(cell, cells, boardSize),
    getCellDownLeft(cell, cells, boardSize),
    getCellDown(cell, cells, boardSize),
    getCellDownRight(cell, cells, boardSize),
  ];
}

export function countSurroundingMines(
  cell: Cell,
  cells: Array<Cell>,
  boardSize: number
) {
  var minesNum = 0;
  getNeigbouringCellsArray(cell, cells, boardSize).forEach(function (
    neighbourCell
  ) {
    neighbourCell && neighbourCell.hasMine && minesNum++;
  });
  return minesNum;
}
