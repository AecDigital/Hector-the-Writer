function zombie(game) {
  this.game = game;

  this.zombies = []

  this.img2 = new Image();
  this.img2.src = './img/zombie1.png';
  this.img2.frames = 4;
  this.img2.frameIndex = 0;


  this.w2 = 160;
  this.h2 = 160;
  this.dx2 = 2;

  this.x2 = this.game.canvas.width;
  this.y2 = 300;

}
zombie.prototype.draw = function() {
this.game.ctx.drawImage(
this.img2,
this.img2.frameIndex * Math.floor(this.img2.width / this.img2.frames),
0,
Math.floor(this.img2.width / this.img2.frames),
this.img2.height,
this.x2,
this.y2,
this.w2,
this.h2,

);
this.animatedImg();
}

zombie.prototype.move = function() {
this.x2 -= this.dx2;
};

zombie.prototype.animatedImg = function() {
  if (this.game.framesCounter % 6 === 0) {
    this.img2.frameIndex += 1;

    if (this.img2.frameIndex > 3) this.img2.frameIndex = 0;
  }
};
