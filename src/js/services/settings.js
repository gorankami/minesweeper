/**
 * Settings service with default values set up
 * @type {Object}
 */
const settingsService = {
  clicksEnabled: true,
  init: init
};

module.exports = settingsService;

function init(difficulty) {
  setSettingsByDifficulty(difficulty);
  settingsService.clicksEnabled = true;
}

function setSettingsByDifficulty(difficulty) {
  switch (difficulty) {
    case "medium":
      settingsService.size = 15;
      settingsService.minesCount = 30;
      break;
    case "hard":
      settingsService.size = 20;
      settingsService.minesCount = 80;
      break;
    default:
      settingsService.size = 10;
      settingsService.minesCount = 10;
      break;
  }
}