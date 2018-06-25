function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;

  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.clear();

      this.framesCounter++;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (
        this.framesCounter %
        (Math.floor(Math.random() * (200 - 120)) + 120) ===
        0
      ) {
        this.generateObstacle();
      }

      if (
        this.framesCounter %
        (Math.floor(Math.random() * (220 - 50)) + 50) ===
        0
      ) {
        this.generateZombie();
      }

      if (
        this.framesCounter %
        (Math.floor(Math.random() * (220 - 100)) + 100) ===
        0
      ) {
        this.generateZombie2();
      }

      this.score += 0.01;

      this.draw();
      this.moveAll();

      this.clearObstacles();

      if (this.isCollision(this.zombies)) {
        this.gameOver();
      }

      if (this.isCollision(this.zombies2)) {
        this.gameOver();
      }

      if (this.isCollision(this.obstacles)) {
        this.gameOver();
      }

      this.isImpacted(this.obstacles);
      this.isImpacted(this.zombies);
      this.isImpacted(this.zombies2);
      
    }.bind(this),
    1000 / this.fps
  );
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.gameOver = function() {
  this.stop();

  if (confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start();
  }
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [];
  this.zombies = [];
  this.zombies2 = [];
  this.framesCounter = 0;
  this.score = 0;
};

Game.prototype.isCollision = function(enemy) {
  return enemy.some(
    function(e) {
      return ((this.player.x + 50) == e.x && (this.player.y + this.player.h) >= e.y);
    }.bind(this)
  );
};

Game.prototype.isImpacted = function(enemy){
  console.log("Entra");
  return enemy.some(
    function(e) {
      for (i=0; i < this.player.bullets.length; i++){
      if ((this.player.bullets[i].x >= e.x)) {
        console.log("Colosiona!")
        enemy.splice(e, 1);
      
      return true
      } else {
        return false
      }
    }
    }.bind(this)
  
  );
};


Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.x >= 0;
  });
};

Game.prototype.clearZombies = function() {
  this.zombies = this.zombies.filter(function(zombie) {
    return zombie.x >= 0;
  });
};

Game.prototype.clearZombies2 = function() {
  this.zombies = this.zombies2.filter(function(zombie2) {
    return zombie.x >= 0;
  });
};

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};

Game.prototype.generateZombie = function() {
  this.zombies.push(new zombie(this));
};

Game.prototype.generateZombie2 = function() {
  this.zombies.push(new zombie2(this));
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
  this.zombies.forEach(function(zombie) {
    zombie.draw();
  });
  this.zombies2.forEach(function(zombie2) {
    zombie2.draw();
  });

  this.ctx.font = "75px sans-serif";
  this.ctx.fillStyle = "green";
  this.ctx.fillText(Math.floor(this.score), 75, 150);
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();

  this.obstacles.forEach(function(obstacle) {
    obstacle.move();
  });
  this.zombies.forEach(function(zombie) {
    zombie.move();
  });
  this.zombies.forEach(function(zombie2) {
    zombie2.move();
  });
};
