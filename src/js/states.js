var icons = {
  blank       : 'http://i.imgur.com/HM1e3Tbb.jpg',
  pressed     : 'http://i.imgur.com/bGT8xGEb.jpg',
  exposedBomb : 'http://i.imgur.com/pTJ8Swhb.jpg',
  explodedBomb: 'http://i.imgur.com/UFmXprFb.jpg',
  flag        : 'http://i.imgur.com/nLPvW15b.jpg',
  // Index is # of adjacent bombs
  bombs       : [
    'http://i.imgur.com/Flqdqi1b.jpg', // 0
    'http://i.imgur.com/bM8oExob.jpg', // 1
    'http://i.imgur.com/bQKSbqYb.jpg', // 2
    'http://i.imgur.com/5jNcEeVb.jpg', // 3
    'http://i.imgur.com/BnxjHgHb.jpg', // 4
    'http://i.imgur.com/RaFrMYcb.jpg', // 5
    'http://i.imgur.com/GlwQOy0b.jpg', // 6
    'http://i.imgur.com/8ngsVa8b.jpg', // 7
    'http://i.imgur.com/lJ8P1wab.jpg'  // 8
  ]
};

var STATES = {};

STATES.BLANK        = getElement(icons.blank);
STATES.PRESSED      = getElement(icons.pressed);
STATES.EXPOSEDBOMB  = getElement(icons.exposedBomb);
STATES.EXPLODEDBOMB = getElement(icons.explodedBomb);
STATES.FLAG         = getElement(icons.flag);
icons.bombs.forEach(function (icon, index) {
  STATES['BOMBS' + index] = getElement(icon);
});

function getElement(image) {
  return '<img src="' + image + '"</img>'
}

module.exports = STATES;


