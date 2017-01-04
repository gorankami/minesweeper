var $         = require("jquery"),
    icons     = require("./icons"),
    UI_STATES = require("./ui-states"),
    Table     = require("./table");

var tableElement = $('#table');
var table        = new Table();

startGame();

$("#btn-start").click(startGame);

function startGame() {
  $(".win-message").hide();
  $(".lose-message").hide();
  var gridSize = Number($("input#grid-size").val());
  var numMines = Number($("input#num-mines").val());
  if (numMines >= gridSize * gridSize) {
    alert("Are you insane? Pick less mines if you want to live!");
  } else {
    table.init(tableElement, gridSize, gridSize, numMines);
    table.render();
  }
}


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