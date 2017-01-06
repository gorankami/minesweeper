var assert            = require('assert'),
    Cell              = require('../src/js/components/cell'),
    navigationService = require('../src/js/services/navigation');

describe("Table functions", function () {


  describe("Checking cell states after setupMineCountOnCells", function () {
    var cells = [
      new Cell(0, 0), new Cell(0, 1), new Cell(0, 2),
      new Cell(1, 0), new Cell(1, 1), new Cell(1, 2),
      new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)
    ];
    cells[0].plantMine();
    cells[3].plantMine();
    cells.forEach(function (cell) {
      if (!cell.hasMine) {
        cell.surroundingMinesCount = navigationService.countSurroundingMines(cell, cells, 3);
      }
    });
    it('Cell 0,0 should be a mine', function () {
      assert(cells[0].hasMine);
    });

    it('Cell 0,1 should have two mines detected', function () {
      assert.equal(cells[1].surroundingMinesCount, 2);
    });
    it('Cell 0,2 should have zero mines detected', function () {
      assert.equal(cells[2].surroundingMinesCount, 0);
    });
    it('Cell 1,0 should be a mine', function () {
      assert(cells[3].hasMine);
    });
    it('Cell 1,1 should have two mines detected', function () {
      assert.equal(cells[4].surroundingMinesCount, 2);
    });
    it('Cell 1,2 should have zero mines detected', function () {
      assert.equal(cells[5].surroundingMinesCount, 0);
    });
    it('Cell 2,0 should have one mine detected', function () {
      assert.equal(cells[6].surroundingMinesCount, 1);
    });

    it('Cell 2,1 should have one mine detected', function () {
      assert.equal(cells[7].surroundingMinesCount, 1);
    });
    it('Cell 2,2 should have zero mines detected', function () {
      assert.equal(cells[8].surroundingMinesCount, 0);
    });
  });
});