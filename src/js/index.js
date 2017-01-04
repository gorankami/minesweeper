var $           = require("jquery"),
    iconService = require("./services/icon"),
    Table       = require("./table");


iconService.cacheIcons();

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
