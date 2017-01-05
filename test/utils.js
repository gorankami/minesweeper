var assert            = require('assert'),
    navigationService = require('../src/js/services/navigation'),
    Cell              = require('../src/js/cell');

describe("Utility functions", function () {

  describe("Counting mines", function () {
    var rows = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
      [new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)]
    ];
    rows[0][0].plantMine();
    rows[1][0].plantMine();

    it('Cell 0,1 should have two mines detected', function () {
      var count = navigationService.countSurroundingMines(rows[0][1], rows);
      assert.equal(count, 2);
    });
    it('Cell 0,2 should have zero mines detected', function () {
      var count = navigationService.countSurroundingMines(rows[0][2], rows);
      assert.equal(count, 0);
    });

    it('Cell 1,1 should have two mines detected', function () {
      var count = navigationService.countSurroundingMines(rows[1][1], rows);
      assert.equal(count, 2);
    });
    it('Cell 1,2 should have zero mines detected', function () {
      var count = navigationService.countSurroundingMines(rows[1][2], rows);
      assert.equal(count, 0);
    });
    it('Cell 2,0 should have one mine detected', function () {
      var count = navigationService.countSurroundingMines(rows[2][0], rows);
      assert.equal(count, 1);
    });

    it('Cell 2,1 should have one mine detected', function () {
      var count = navigationService.countSurroundingMines(rows[2][1], rows);
      assert.equal(count, 1);
    });
    it('Cell 2,2 should have zero mines detected', function () {
      var count = navigationService.countSurroundingMines(rows[2][2], rows);
      assert.equal(count, 0);
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
        assert.equal(navigationService.getCellUp(middle, rows), rows[0][1]);
      });
      it('should return rows[1][0] for getCellLeft', function () {
        assert.equal(navigationService.getCellLeft(middle, rows), rows[1][0]);
      });
      it('should return rows[1][2] for getCellRight', function () {
        assert.equal(navigationService.getCellRight(middle, rows), rows[1][2]);
      });
      it('should return rows[2][1] for getCellDown', function () {
        assert.equal(navigationService.getCellDown(middle, rows), rows[2][1]);
      });
      it('should return rows[0][0] for getCellUpLeft', function () {
        assert.equal(navigationService.getCellUpLeft(middle, rows), rows[0][0]);
      });
      it('should return rows[0][2] for getCellUpRight', function () {
        assert.equal(navigationService.getCellUpRight(middle, rows), rows[0][2]);
      });
      it('should return rows[2][0] for getCellDownLeft', function () {
        assert.equal(navigationService.getCellDownLeft(middle, rows), rows[2][0]);
      });
      it('should return rows[2][2] for getCellDownRight', function () {
        assert.equal(navigationService.getCellDownRight(middle, rows), rows[2][2]);
      });
    });


    describe('should return all cells when pivot is middle', function () {
      var middle = rows[1][1];

      it('should return true for getCellUp', function () {
        assert.notEqual(navigationService.getCellUp(middle, rows), null);
      });
      it('should return true for getCellLeft', function () {
        assert.notEqual(navigationService.getCellLeft(middle, rows), null);
      });
      it('should return true for getCellRight', function () {
        assert.notEqual(navigationService.getCellRight(middle, rows), null);
      });
      it('should return true for getCellDown', function () {
        assert.notEqual(navigationService.getCellDown(middle, rows), null);
      });
      it('should return true for getCellUpLeft', function () {
        assert.notEqual(navigationService.getCellUpLeft(middle, rows), null);
      });
      it('should return true for getCellUpRight', function () {
        assert.notEqual(navigationService.getCellUpRight(middle, rows), null);
      });
      it('should return true for getCellDownLeft', function () {
        assert.notEqual(navigationService.getCellDownLeft(middle, rows), null);
      });
      it('should return true for getCellDownRight', function () {
        assert.notEqual(navigationService.getCellDownRight(middle, rows), null);
      });
    });

    describe('should fail to retrieve up left, up, up right and left when pivot is first cell', function () {
      var first = rows[0][0];

      it('should fail for getCellUpLeft', function () {
        assert.equal(navigationService.getCellUpLeft(first, rows), null);
      });
      it('should fail for getCellLeft', function () {
        assert.equal(navigationService.getCellLeft(first, rows), null);
      });
      it('should fail for getCellUpRight', function () {
        assert.equal(navigationService.getCellUpRight(first, rows), null);
      });
      it('should fail for getCellLeft', function () {
        assert.equal(navigationService.getCellLeft(first, rows), null);
      });
    })

  })

});