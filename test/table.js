var assert = require('assert');
var Table  = require('../src/js/table');
var STATES = require('../src/js/states');

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
      var count = Table.countSurroundingMines(rows[0][0], rows);
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
      assert.equal(rows[0][0].state, STATES.EXPOSEDBOMB);
    });

    it('Cell 0,1 should have two mines detected', function () {
      assert.equal(rows[0][1].state, STATES.BOMBS2);
    });
    it('Cell 0,2 should have zero mines detected', function () {
      assert.equal(rows[0][2].state, STATES.BOMBS0);
    });
    it('Cell 1,0 should be a mine', function () {
      assert.equal(rows[1][0].state, STATES.EXPOSEDBOMB);
    });
    it('Cell 1,1 should have two mines detected', function () {
      assert.equal(rows[1][1].state, STATES.BOMBS2);
    });
    it('Cell 1,2 should have zero mines detected', function () {
      assert.equal(rows[1][2].state, STATES.BOMBS0);
    });
    it('Cell 2,0 should have one mine detected', function () {
      assert.equal(rows[2][0].state, STATES.BOMBS1);
    });

    it('Cell 2,1 should have one mine detected', function () {
      assert.equal(rows[2][1].state, STATES.BOMBS1);
    });
    it('Cell 2,2 should have zero mines detected', function () {
      assert.equal(rows[2][2].state, STATES.BOMBS0);
    });
  });
});