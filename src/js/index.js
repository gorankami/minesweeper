var $               = require("jquery"),
    iconService     = require("./services/icon"),
    settingsService = require("./services/settings"),
    tableService    = require("./services/table");

$("input#grid-size").val(settingsService.size);
$("input#num-mines").val(settingsService.minesCount);

iconService.cacheIcons();

var tableElement = $('#table');

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
    tableService.init(tableElement, size, minesCount);
    tableService.render();
  }
}
