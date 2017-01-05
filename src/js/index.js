var iconService = require("./services/icon"),
    gameService = require("./services/game");

iconService.cacheIcons();
gameService.start();

