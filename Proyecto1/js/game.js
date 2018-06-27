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

      if (
        this.framesCounter %
        (Math.floor(Math.random() * (300 - 200)) + 200) ===
        0
      ) {
        this.generatePapers();
      }

      this.draw();
      this.moveAll();
      this.every100();
      this.every200papers();
      this.clearObstacles();

      if (this.isCollision(this.zombies)) {
        this.gameOver();
      }

      if (this.isCollision(this.zombies2)) {
        this.gameOver();
      }

      if (this.isCollision2(this.obstacles)) {
        this.gameOver();
      }

      if (this.isgetpapers(this.papers)) {
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
  this.enemyKilled = new enemykilled(this);
  this.scorehit = new scorehit(this);
  this.paperhit = new paperhit(this);
  this.obstacles = [];
  this.zombies = [];
  this.zombies2 = [];
  this.papers = [];
  this.framesCounter = 0;
  this.score = 0;
  this.getpapers = 0;
  this.killed = [];
};

Game.prototype.isCollision = function(enemy) {
  return enemy.some(
    function(e) {
      return this.player.x + 50 == e.x && this.player.y + this.player.h >= e.y;
    }.bind(this)
  );
};

Game.prototype.isCollision2 = function(enemy) {
  return enemy.some(
    function(e) {
      return this.player.x + 50 == e.x && this.player.y + this.player.h <= e.y;
    }.bind(this)
  );
};

Game.prototype.isgetpapers = function(paper) {
  return paper.some(
    function(paper) {
      if (
        this.player.x + 50 >= paper.x &&
        this.player.y + this.player.h >= paper.y
      ) {
        this.papers.splice(paper, 1);
        this.getpapers = this.getpapers + 20;
      }
      return true;
    }.bind(this)
  );
};

Game.prototype.isImpacted = function(enemy) {
  return enemy.some(
    function(e) {
      for (i = 0; i < this.player.bullets.length; i++) {
        if (
          this.player.bullets[i].x > e.x + (e.w - 100) &&
          this.player.bullets[i].x + this.player.bullets[i].w > e.x &&
          this.player.bullets[i].y < e.y + e.h &&
          this.player.bullets[i].y + this.player.bullets[i].h > e.y
        ) {
          this.enemyKilled.draw(e.x, e.y);
          this.killed++;
          enemy.splice(e, 1);
          this.player.bullets.splice(this.player.bullets[i]);
          this.score = this.score + 10;

          return true;
        } else {
          return false;
        }
      }
    }.bind(this)
  );
};

Game.prototype.every100 = function() {
  if (this.score % 100 == 0 && this.score > 0) {
    this.scorehit.draw();
  }
};

Game.prototype.every200papers = function() {
  if (this.getpapers % 200 == 0 && this.getpapers > 0) {
    this.paperhit.draw();
  }
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

Game.prototype.generatePapers = function() {
  this.papers.push(new paper(this));
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
  this.papers.forEach(function(paper) {
    paper.draw();
  });

  this.ctx.font = "50px sans-serif";
  this.ctx.fillStyle = "#00ffbf";
  this.ctx.fillStyle = "yellow";
  this.ctx.fillText("Score: " + Math.floor(this.score) + " points!", 1000, 75);
  this.ctx.fillStyle = "#00ffbf";
  this.ctx.fillText("Papers: " + Math.floor(this.getpapers),  75, 75);
};

/*Game.prototype.isProgress = function(getpapers) {
  if (this.getpapers == 0) {
    this.ctx.fillStyle = "#00ffbf";
    this.ctx.fillRect(50, 50, 15, 50);
    this.ctx.fillText(
      "Papers Recovery: " + Math.floor(this.getpapers) + " not yet!",
      500,
      75
    );
  } else if (this.getpapers > 0 && this.getpapers <= 120) {
    this.ctx.font = "50px sans-serif";
    this.ctx.fillStyle = "#00ffbf";
    this.ctx.fillRect(50, 50, 100, 50);
    this.ctx.fillText(
      "Papers Recovery " + Math.floor(this.getpapers) + " papers!!",
      500,
      75
    );
  }
};*/

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
  this.papers.forEach(function(paper) {
    paper.move();
  });
  
};
