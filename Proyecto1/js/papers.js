function paper(game) {
  this.game = game;

  this.papers = [];

  this.img = new Image();
  this.img.src = "./img/papers2.png";

  
  this.w = 300;
  this.h = 300;
  this.dx = 3;
  this.x = this.game.canvas.width;
  this.y = Math.floor(Math.random()*(300 - 100))+10
}
paper.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h,
    );
  
};

paper.prototype.move = function() {
  this.x -= this.dx;
};
