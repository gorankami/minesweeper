var defaults = {
  size      : 10,
  minesCount: 10
};

/**
 * Settings service with default values set up
 * @type {Object}
 */
var settingsService = {
  size         : defaults.size,
  minesCount   : defaults.minesCount,
  clicksEnabled: true,
  init         : init
};

module.exports = settingsService;

function init(size, minesCount) {
  settingsService.clicksEnabled = true;
  settingsService.size          = size || defaults.size;
  settingsService.minesCount    = minesCount || defaults.minesCount;
}