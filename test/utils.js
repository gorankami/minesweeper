var assert = require('assert');
var utils  = require('../src/js/utils');
var Cell   = require('../src/js/cell');

describe("Utility functions", function () {
  describe("Random number", function () {
    it("should return a number between (inclusive) 0 and 10 at least 1000 times", function () {
      for (var i = 0; i < 1000; i++) {
        var randNum = utils.rand(0, 10);
        assert(randNum >= 0 && randNum < 10);
      }
    });
  });

  describe('Check if cell is a mine', function () {

    it('should return false when cell is null', function () {
      assert(utils.hasMine(null) === false)
    });

    it('should return false when cell has no mine', function () {
      var cell = new Cell();
      assert(utils.hasMine(cell) === false)
    });

    it('should return true when cell has a mine', function () {
      var cell = new Cell();
      cell.plantMine();
      assert(utils.hasMine(cell) === true)
    });
  });

  describe('getting cells from 3x3 matrix', function () {
    var rows = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1), new Cell(1, 1)],
      [new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)]
    ];

    describe('should return correct cells', function () {
      var middle = rows[1][1];

      it('should return rows[0][1] for getCellUp', function () {
        assert(utils.getCellUp(middle, rows) === rows[0][1]);
      });
      it('should return rows[1][0] for getCellLeft', function () {
        assert(utils.getCellLeft(middle, rows) === rows[1][0]);
      });
      it('should return rows[1][2] for getCellRight', function () {
        assert(utils.getCellRight(middle, rows) === rows[1][2]);
      });
      it('should return rows[2][1] for getCellDown', function () {
        assert(utils.getCellDown(middle, rows) === rows[2][1]);
      });
      it('should return rows[0][0] for getCellUpLeft', function () {
        assert(utils.getCellUpLeft(middle, rows) === rows[0][0]);
      });
      it('should return rows[0][2] for getCellUpRight', function () {
        assert(utils.getCellUpRight(middle, rows) === rows[0][2]);
      });
      it('should return rows[2][0] for getCellDownLeft', function () {
        assert(utils.getCellDownLeft(middle, rows) === rows[2][0]);
      });
      it('should return rows[2][2] for getCellDownRight', function () {
        assert(utils.getCellDownRight(middle, rows) === rows[2][2]);
      });
    });

    describe('should return all cells when pivot is middle', function () {
      var middle = rows[1][1];

      it('should return true for getCellUp', function () {
        assert(utils.getCellUp(middle, rows) !== null);
      });
      it('should return true for getCellLeft', function () {
        assert(utils.getCellLeft(middle, rows) !== null);
      });
      it('should return true for getCellRight', function () {
        assert(utils.getCellRight(middle, rows) !== null);
      });
      it('should return true for getCellDown', function () {
        assert(utils.getCellDown(middle, rows) !== null);
      });
      it('should return true for getCellUpLeft', function () {
        assert(utils.getCellUpLeft(middle, rows) !== null);
      });
      it('should return true for getCellUpRight', function () {
        assert(utils.getCellUpRight(middle, rows) !== null);
      });
      it('should return true for getCellDownLeft', function () {
        assert(utils.getCellDownLeft(middle, rows) !== null);
      });
      it('should return true for getCellDownRight', function () {
        assert(utils.getCellDownRight(middle, rows) !== null);
      });
    });

    describe('should fail to retrieve up left, up, up right and left when pivot is first cell', function () {
      var first = rows[0][0];

      it('should fail for getCellUpLeft', function () {
        assert.equal(utils.getCellUpLeft(first, rows), null);
      });
      it('should fail for getCellLeft', function () {
        assert.equal(utils.getCellLeft(first, rows), null);
      });
      it('should fail for getCellUpRight', function () {
        assert.equal(utils.getCellUpRight(first, rows), null);
      });
      it('should fail for getCellLeft', function () {
        assert.equal(utils.getCellLeft(first, rows), null);
      });
    })

  })

});