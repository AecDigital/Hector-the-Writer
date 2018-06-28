function Bullet(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.r = 5;
  this.w = this.r*4;
  this.h = this.w;

  this.vx = 10;
  this.vy = 1;

  this.a = 0.25;
}
Bullet.prototype.draw = function() {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle = "#00ffbf";
  this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 5);
  this.game.ctx.fill();
  this.game.ctx.closePath();
}
Bullet.prototype.move = function() {
  this.x += this.vx;
  this.vy += this.a;
  this.y += this.vy;
  if (this.y > this.game.player.y0 + this.game.player.h) {
    this.vy *= -2;
  }
};
