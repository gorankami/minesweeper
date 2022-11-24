import { Cell } from "../Cell";
import { UI_STATES } from "../enums/ui-states";

//cache images, prevents white surfaces on clicks
export function cacheIcons() {
  cache(icons.blank);
  cache(icons.pressed);
  cache(icons.exposedBomb);
  cache(icons.explodedBomb);
  cache(icons.flag);
  icons.bombs.forEach(cache);
}

function cache(url: string) {
  var img = new Image();
  img.src = url;
}


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

export function getIconForCell(cell: Cell) {
  switch (cell.uiState) {
    case UI_STATES.BEING_PRESSED:
      return icons.pressed;
    case UI_STATES.FLAGGED:
      return icons.flag;
    case UI_STATES.UNCOVERED:
      if (cell.hasExploded) {
        return icons.explodedBomb;
      } else if (cell.hasMine) {
        return icons.exposedBomb;
      } else {
        return icons.bombs[cell.surroundingMinesCount];
      }
    case UI_STATES.HIDDEN:
    default:
      return icons.blank;
  }
}