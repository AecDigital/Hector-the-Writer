function Player(game) {
  this.game = game;
 
  this.x = this.game.canvas.width * 0.08;
  this.y0 = this.game.canvas.height * 0.8;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = 'img/player.png';
  this.img.frames = 3;
  this.img.frameIndex = 0;

}