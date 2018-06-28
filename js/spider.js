function Obstacle(game) {
  this.game = game;
  this.obstacles = [];
  this.img = new Image();
  this.img.src = "./img/mosca.png";
  this.w = 100;
  this.h = 100;
  this.dx = 3;
  this.x = this.game.canvas.width;
  this.y = Math.floor(Math.random() * (300 - 100)) + 10;
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

  Obstacle.prototype.move = function() {
    this.x -= this.dx;
    this.x2 -= this.dx2;
  };
};
