function zombie(game) {
  this.game = game;

  this.zombies = []

  this.img = new Image();
  this.img.src = './img/zombie1.png';
  this.img.frames = 4;
  this.img.frameIndex = 0;


  this.w = 130;
  this.h = 170;
  this.dx = 2;

  this.x = this.game.canvas.width;
  this.y = 270;

}
zombie.prototype.draw = function() {
this.game.ctx.drawImage(
this.img,
this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
0,
Math.floor(this.img.width / this.img.frames),
this.img.height,
this.x,
this.y,
this.w,
this.h,

);
this.animatedImg();
}

zombie.prototype.move = function() {
this.x -= this.dx;
};

zombie.prototype.animatedImg = function() {
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 3) this.img.frameIndex = 0;
  }
};

zombie.prototype.impacted
