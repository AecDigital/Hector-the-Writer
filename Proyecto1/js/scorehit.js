function scorehit(game) {
  this.game = game;

  this.scorehit = [];

  this.img = new Image();
  this.img.src = "./img/cool.png";
  this.x = 520;
  this.y = 100;
  this.w = 450;
  this.h = 450;
}
scorehit.prototype.draw = function() {
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

scorehit.prototype.move = function() {
  this.x -= this.dx;
};
