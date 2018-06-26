function enemykilled(game) {
  this.game = game;

  this.killed = [];

  this.img = new Image();
  this.img.src = "./img/enemykill.png";

  this.w = 150;
  this.h = 150;
  this.dx = 8;
}
enemykilled.prototype.draw = function(x, y) {
  this.game.ctx.drawImage(
    this.img,
    0,
    0,
    this.img.width,
    this.img.height,
    x,
    y,
    this.w,
    this.h
  );
};

enemykilled.prototype.move = function() {
  this.x -= this.dx;
};
