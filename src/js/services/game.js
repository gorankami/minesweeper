var $               = require("jquery"),
    settingsService = require("./settings"),
    tableService    = require("./table");

var gameService = {
  init: init
};

module.exports = gameService;

function init() {
  $("input#grid-size").val(settingsService.size);
  $("input#num-mines").val(settingsService.minesCount);
  startGame();
}

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
    tableService.init($('#table'), size, minesCount);
    tableService.render();
  }
}