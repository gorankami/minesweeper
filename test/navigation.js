var assert            = require('assert'),
    navigationService = require('../src/js/services/navigation'),
    Cell              = require('../src/js/components/cell');

describe("Navigation functions", function () {

  describe("Counting mines", function () {
    var cells = [
      new Cell(0, 0), new Cell(0, 1), new Cell(0, 2),
      new Cell(1, 0), new Cell(1, 1), new Cell(1, 2),
      new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)
    ];
    cells[0].plantMine();
    cells[3].plantMine();

    it('Cell 0,1 should have two mines detected', function () {
      var count = navigationService.countSurroundingMines(cells[1], cells, 3);
      assert.equal(count, 2);
    });
    it('Cell 0,2 should have zero mines detected', function () {
      var count = navigationService.countSurroundingMines(cells[2], cells, 3);
      assert.equal(count, 0);
    });

    it('Cell 1,1 should have two mines detected', function () {
      var count = navigationService.countSurroundingMines(cells[4], cells, 3);
      assert.equal(count, 2);
    });
    it('Cell 1,2 should have zero mines detected', function () {
      var count = navigationService.countSurroundingMines(cells[5], cells, 3);
      assert.equal(count, 0);
    });
    it('Cell 2,0 should have one mine detected', function () {
      var count = navigationService.countSurroundingMines(cells[6], cells, 3);
      assert.equal(count, 1);
    });

    it('Cell 2,1 should have one mine detected', function () {
      var count = navigationService.countSurroundingMines(cells[7], cells, 3);
      assert.equal(count, 1);
    });
    it('Cell 2,2 should have zero mines detected', function () {
      var count = navigationService.countSurroundingMines(cells[8], cells, 3);
      assert.equal(count, 0);
    });
  });

  describe('getting cells from 3x3 matrix', function () {
    var cells = [
      new Cell(0, 0), new Cell(0, 1), new Cell(0, 2),
      new Cell(1, 0), new Cell(1, 1), new Cell(1, 2),
      new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)
    ];

    describe('should return correct cells', function () {
      var middle = cells[4];

      it('should return cells[0][1] for getCellUp', function () {
        assert.equal(navigationService.getCellUp(middle, cells, 3), cells[1]);
      });
      it('should return cells[1][0] for getCellLeft', function () {
        assert.equal(navigationService.getCellLeft(middle, cells, 3), cells[3]);
      });
      it('should return cells[1][2] for getCellRight', function () {
        assert.equal(navigationService.getCellRight(middle, cells, 3), cells[5]);
      });
      it('should return cells[2][1] for getCellDown', function () {
        assert.equal(navigationService.getCellDown(middle, cells, 3), cells[7]);
      });
      it('should return cells[0][0] for getCellUpLeft', function () {
        assert.equal(navigationService.getCellUpLeft(middle, cells, 3), cells[0]);
      });
      it('should return cells[0][2] for getCellUpRight', function () {
        assert.equal(navigationService.getCellUpRight(middle, cells, 3), cells[2]);
      });
      it('should return cells[2][0] for getCellDownLeft', function () {
        assert.equal(navigationService.getCellDownLeft(middle, cells, 3), cells[6]);
      });
      it('should return cells[2][2] for getCellDownRight', function () {
        assert.equal(navigationService.getCellDownRight(middle, cells, 3), cells[8]);
      });
    });


    describe('should return all cells when pivot is middle', function () {
      var middle = cells[4];

      it('should return true for getCellUp', function () {
        assert.notEqual(navigationService.getCellUp(middle, cells, 3), null);
      });
      it('should return true for getCellLeft', function () {
        assert.notEqual(navigationService.getCellLeft(middle, cells, 3), null);
      });
      it('should return true for getCellRight', function () {
        assert.notEqual(navigationService.getCellRight(middle, cells, 3), null);
      });
      it('should return true for getCellDown', function () {
        assert.notEqual(navigationService.getCellDown(middle, cells, 3), null);
      });
      it('should return true for getCellUpLeft', function () {
        assert.notEqual(navigationService.getCellUpLeft(middle, cells, 3), null);
      });
      it('should return true for getCellUpRight', function () {
        assert.notEqual(navigationService.getCellUpRight(middle, cells, 3), null);
      });
      it('should return true for getCellDownLeft', function () {
        assert.notEqual(navigationService.getCellDownLeft(middle, cells, 3), null);
      });
      it('should return true for getCellDownRight', function () {
        assert.notEqual(navigationService.getCellDownRight(middle, cells, 3), null);
      });
    });

    describe('should fail to retrieve up left, up, up right and left when pivot is first cell', function () {
      var first = cells[0];

      it('should fail for getCellUpLeft', function () {
        assert.equal(navigationService.getCellUpLeft(first, cells, 3), null);
      });
      it('should fail for getCellLeft', function () {
        assert.equal(navigationService.getCellLeft(first, cells, 3), null);
      });
      it('should fail for getCellUpRight', function () {
        assert.equal(navigationService.getCellUpRight(first, cells, 3), null);
      });
      it('should fail for getCellLeft', function () {
        assert.equal(navigationService.getCellLeft(first, cells, 3), null);
      });
    })

  })

});