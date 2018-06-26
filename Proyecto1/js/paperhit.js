function paperhit(game) {
  this.game = game;

  this.paperhit = [];

  this.img = new Image();
  this.img.src = "./img/yeah.png";
  this.x = 520;
  this.y = 100;
  this.w = 550;
  this.h = 450;
}
paperhit.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    0,
    0,
    this.img.width,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );
};

paperhit.prototype.move = function() {
  this.x -= this.dx;
};
