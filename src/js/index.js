var $               = require("jquery"),
    iconService     = require("./services/icon"),
    settingsService = require("./services/settings"),
    Table           = require("./table");

$("input#grid-size").val(settingsService.size);
$("input#num-mines").val(settingsService.minesCount);

iconService.cacheIcons();

var tableElement = $('#table');
var table        = new Table();

startGame();

$("#btn-start").click(startGame);

function startGame() {
  $(".win-message").hide();
  $(".lose-message").hide();
  var size       = Number($("input#grid-size").val());
  var minesCount = Number($("input#num-mines").val());

  if (minesCount >= size * size) {
    alert("Are you insane? Pick less mines if you want to live!");
  } else {
    settingsService.init(size, minesCount);
    table.init(tableElement, size, minesCount);
    table.render();
  }
}
