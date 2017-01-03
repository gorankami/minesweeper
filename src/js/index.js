var $     = require("jquery"),
    Table = require("./table");

var defaults = {
  rows   : 10,
  columns: 10,
  mines  : 10
};

var tableElement = $('#table');
var table        = new Table();
table.init(tableElement, defaults.rows, defaults.columns, defaults.mines);
table.render();