function Cell(x, y){
  this.x = x;
  this.y = y;
  this.state = STATES.BLANK;
}

(function(){

  Cell.prototype.getElement = function(){
    if(!this.cellElement ){
      this.cellElement = $('<td></td>');
    }
    return this.cellElement;
  };

  Cell.prototype.render = function(){
    this.cellElement.html(this.state);
  }
})();

