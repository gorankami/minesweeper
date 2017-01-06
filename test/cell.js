var assert    = require('assert'),
    jsdom     = require('jsdom'),
    jquery    = require('jquery'),
    UI_STATES = require('../src/js/enums/ui-states'),
    Cell      = require('../src/js/components/cell');

var $ = null;

describe('Cell component', function () {
  describe('Cell init', function () {
    it('should have coordinates from the constructor', function () {
      var cell = new Cell(10, 23);
      assert.equal(cell.rowNum, 10);
      assert.equal(cell.colNum, 23);
    });
  });

  describe('Cell operations', function () {
    it('should have mine after planting', function () {
      var cell = new Cell();
      cell.plantMine();
      assert(cell.hasMine);
    });


    it('should fall back to previous UI state after canceling state change', function () {
      var cell             = new Cell();
      cell.previousUiState = UI_STATES.HIDDEN;
      cell.uiState         = UI_STATES.UNCOVERED;
      cell.revertState();
      assert.equal(cell.uiState, UI_STATES.HIDDEN);
    });
  });

  //tests in DOM
  jsdom.env({
    html: "<div id='container'>test</div>",
    url : "http://localhost:1337/",
    done: jsdomLoaded
  });
});


function jsdomLoaded(err, window) {
  describe('JQuery', function () {
    before(function () {
      $ = jquery(window);
    });

    it('jquery works', function () {
      assert.equal($("#container").text(), 'test');
    });

    it('should create an element', function(){
      var cell = new Cell();
      assert.equal(cell.cellElement, null);
      var newElement = cell.getElement($);
      assert.equal(cell.cellElement, newElement);
    });

    it('should be return singleton for getElement', function(){
      var cell = new Cell();
      // assert.equal(cell.cellElement, null);
      var element1 = cell.getElement($);
      var element2 = cell.getElement($);
      assert.equal(element1, element2);
    });
  });
}