function Table() {
}

(function () {
  Table.prototype.init = function (tableElement, m, n, numMines) {
    var rows = createTableCells(m, n);
    populateElements(tableElement, rows);
    plantMines(rows, numMines);
    this.rows = rows;
  };

  Table.prototype.render = function(){
    render(this.rows);
  };

  function createTableCells(m, n) {
    var rows = [];
    for (var x = 0; x < m; x++) {
      var row = [];
      for (var y = 0; y < n; y++) {
        row.push(new Cell(x, y));
      }
      rows.push(row);
    }
    return rows;
  }

  function populateElements(tableElement, rows) {
    rows.forEach(function (row) {
      var rowElement = $('<tr></tr>');
      row.forEach(function (cell) {
        rowElement.append(cell.getElement());
      });
      tableElement.append(rowElement);
    });
  }

  function render(rows){
    rows.forEach(function (row) {
      row.forEach(function (cell) {
        cell.render();
      });
    });
  }

  function plantMines(rows, numMines){
    var plantedMineCells = [];
    while(plantedMineCells.length < numMines){
      var randRow = rows[rand(0, rows.length - 1)];
      var randCell = randRow[rand(0, randRow.length - 1)];
      if(plantedMineCells.indexOf(randCell) < 0){ //don't pick the same cell twice
        plantedMineCells.push(randCell);
        randCell.plantMine();
      }
    }
  }

  function rand(min, max){
    return Math.floor(Math.random() * max) + min;
  }
})();