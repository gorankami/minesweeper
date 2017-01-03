var assert = require('assert'),
    utils  = require('../src/js/utils'),
    Cell   = require('../src/js/cell');

describe("Utility functions", function () {
  describe("Random number", function () {
    it("should return a number between (inclusive) 0 and 10 at least 1000 times", function () {
      for (var i = 0; i < 1000; i++) {
        var randNum = utils.rand(0, 10);
        assert(randNum >= 0 && randNum < 10);
      }
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
        assert.equal(utils.getCellUp(middle, rows), rows[0][1]);
      });
      it('should return rows[1][0] for getCellLeft', function () {
        assert.equal(utils.getCellLeft(middle, rows), rows[1][0]);
      });
      it('should return rows[1][2] for getCellRight', function () {
        assert.equal(utils.getCellRight(middle, rows), rows[1][2]);
      });
      it('should return rows[2][1] for getCellDown', function () {
        assert.equal(utils.getCellDown(middle, rows), rows[2][1]);
      });
      it('should return rows[0][0] for getCellUpLeft', function () {
        assert.equal(utils.getCellUpLeft(middle, rows), rows[0][0]);
      });
      it('should return rows[0][2] for getCellUpRight', function () {
        assert.equal(utils.getCellUpRight(middle, rows), rows[0][2]);
      });
      it('should return rows[2][0] for getCellDownLeft', function () {
        assert.equal(utils.getCellDownLeft(middle, rows), rows[2][0]);
      });
      it('should return rows[2][2] for getCellDownRight', function () {
        assert.equal(utils.getCellDownRight(middle, rows), rows[2][2]);
      });
    });

    describe('should return all cells when pivot is middle', function () {
      var middle = rows[1][1];

      it('should return true for getCellUp', function () {
        assert.notEqual(utils.getCellUp(middle, rows), null);
      });
      it('should return true for getCellLeft', function () {
        assert.notEqual(utils.getCellLeft(middle, rows), null);
      });
      it('should return true for getCellRight', function () {
        assert.notEqual(utils.getCellRight(middle, rows), null);
      });
      it('should return true for getCellDown', function () {
        assert.notEqual(utils.getCellDown(middle, rows), null);
      });
      it('should return true for getCellUpLeft', function () {
        assert.notEqual(utils.getCellUpLeft(middle, rows), null);
      });
      it('should return true for getCellUpRight', function () {
        assert.notEqual(utils.getCellUpRight(middle, rows), null);
      });
      it('should return true for getCellDownLeft', function () {
        assert.notEqual(utils.getCellDownLeft(middle, rows), null);
      });
      it('should return true for getCellDownRight', function () {
        assert.notEqual(utils.getCellDownRight(middle, rows), null);
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