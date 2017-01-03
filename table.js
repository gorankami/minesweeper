function Table() {
}

(function () {
  Table.prototype.init = function (tableElement, m, n) {
    var rows = createTableCells(m, n);
    populateElements(tableElement, rows);
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
})();