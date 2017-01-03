var assert = require('assert'),
    Cell   = require('../src/js/cell'),
    Table  = require('../src/js/table');

describe("Table functions", function () {
  describe("Counting mines", function () {
    var rows = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
      [new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)]
    ];
    rows[0][0].plantMine();
    rows[1][0].plantMine();


    it('Cell 0,1 should have two mines detected', function () {
      var count = Table.countSurroundingMines(rows[0][1], rows);
      assert.equal(count, 2);
    });
    it('Cell 0,2 should have zero mines detected', function () {
      var count = Table.countSurroundingMines(rows[0][2], rows);
      assert.equal(count, 0);
    });

    it('Cell 1,1 should have two mines detected', function () {
      var count = Table.countSurroundingMines(rows[1][1], rows);
      assert.equal(count, 2);
    });
    it('Cell 1,2 should have zero mines detected', function () {
      var count = Table.countSurroundingMines(rows[1][2], rows);
      assert.equal(count, 0);
    });
    it('Cell 2,0 should have one mine detected', function () {
      var count = Table.countSurroundingMines(rows[2][0], rows);
      assert.equal(count, 1);
    });

    it('Cell 2,1 should have one mine detected', function () {
      var count = Table.countSurroundingMines(rows[2][1], rows);
      assert.equal(count, 1);
    });
    it('Cell 2,2 should have zero mines detected', function () {
      var count = Table.countSurroundingMines(rows[2][2], rows);
      assert.equal(count, 0);
    });
  });

  describe("Checking cell states after setupMineCountOnCells", function () {
    var rows = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
      [new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)]
    ];
    rows[0][0].plantMine();
    rows[1][0].plantMine();
    Table.setupMineCountOnCells(rows);
    it('Cell 0,0 should be a mine', function () {
      assert(rows[0][0].hasMine);
    });

    it('Cell 0,1 should have two mines detected', function () {
      assert.equal(rows[0][1].surroundingMinesCount, 2);
    });
    it('Cell 0,2 should have zero mines detected', function () {
      assert.equal(rows[0][2].surroundingMinesCount, 0);
    });
    it('Cell 1,0 should be a mine', function () {
      assert(rows[1][0].hasMine);
    });
    it('Cell 1,1 should have two mines detected', function () {
      assert.equal(rows[1][1].surroundingMinesCount, 2);
    });
    it('Cell 1,2 should have zero mines detected', function () {
      assert.equal(rows[1][2].surroundingMinesCount, 0);
    });
    it('Cell 2,0 should have one mine detected', function () {
      assert.equal(rows[2][0].surroundingMinesCount, 1);
    });

    it('Cell 2,1 should have one mine detected', function () {
      assert.equal(rows[2][1].surroundingMinesCount, 1);
    });
    it('Cell 2,2 should have zero mines detected', function () {
      assert.equal(rows[2][2].surroundingMinesCount, 0);
    });
  });
});