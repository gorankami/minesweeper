var $     = require("jquery"),
    icons = require("./icons"),
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

//cache images, prevents white surfaces on clicks
cache(icons.blank);
cache(icons.pressed);
cache(icons.exposedBomb);
cache(icons.explodedBomb);
cache(icons.flag);
icons.bombs.forEach(cache);

function cache(url) {
  var img = new Image();
  img.src = url;
}