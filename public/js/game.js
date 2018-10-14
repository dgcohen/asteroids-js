(function(root) {
	"use strict";
	
  var Asteroids = root.Asteroids = root.Asteroids || {};
  var Asteroid = Asteroids.Asteroid;
  var Ship = Asteroids.Ship;
	
	var DIM_X = 1000,
			DIM_Y = 500,
      SCORE_X = 30,
      SCORE_Y = 40,
			FPS = 25,
			NUM_ASTEROIDS = 3,
			SHIP_COLOR = "blue",
			SHIP_RADIUS = 30,
			ASTEROID_COLOR = "gray",
			ASTEROID_RADIUS = 27;
			
  var Game = Asteroids.Game = function(context) {
		var that = this;
		
    this.context = context;
    this.ship = new Ship([DIM_X / 3, DIM_Y / 3], SHIP_RADIUS, SHIP_COLOR);
		this.asteroids = Game.addAsteroids(NUM_ASTEROIDS, this.ship.pos, ASTEROID_RADIUS, ASTEROID_COLOR);
    this.bullets = [];
    this.hitAsteroids = 0;
		this.img = new Image();
		this.img.onload = function () {
		  that.context.drawImage(that.img, 0, 0);
		};
		this.img.src = 'img/spacebackground.jpg';
  };
	
  Game.addAsteroids = function(numAsteroids, shipPos, radius, color) {
    var asteroids = [];
    for (var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroid.randomAsteroid(DIM_X, DIM_Y, shipPos, radius, color));
    }
    return asteroids;
  };
	
	Game.prototype.bindKeyHandlers = function() {
		key('j', this.ship.rotateCounterClockwise.bind(this.ship));
		key('k', this.ship.rotateClockwise.bind(this.ship));
		key('f', this.ship.power.bind(this.ship, 1));
		key('d', this.ship.power.bind(this.ship, -1));
		key('space', this.fireBullet.bind(this));
	};
	
  Game.prototype.cleanUp = function() {
    var that = this;
    this.checkOutOfBounds(this.asteroids);
    this.checkOutOfBounds(this.bullets);
    if (this.isOutOfBounds(this.ship)) {
      this.ship.pos = ([DIM_X / 2, DIM_Y / 2]);
    }
  };
	
  Game.prototype.draw = function() {
    var context = this.context;
    context.clearRect(0, 0, DIM_X, DIM_Y);
		context.drawImage(this.img, 0, 0);
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(context);
    });
    this.bullets.forEach(function(bullet) {
      bullet.draw(context);
    });

    this.ship.draw(context);
  };
	
	Game.prototype.fireBullet = function() {
		var bullet = this.ship.fireBullet();
		this.bullets.push(bullet);
	};
	
  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    this.bullets.forEach(function(bullet) {
      bullet.move();
    });
    this.ship.move();
  };
	
  Game.prototype.checkCollision = function() {
    var ship = this.ship,
        collision = false;
    this.asteroids.some(function(asteroid) {
      if (asteroid.isCollidedWith(ship)) {
        collision = true;
        return true;
      }
    });
    if (collision) {
      this.stop();
    }
  };
	
  Game.prototype.checkShots = function() {

    var removeTheseBullets = [];
    var removeTheseAsteroids = [];
    var that = this;
    this.bullets.forEach(function(bullet, bulletI) {
      that.asteroids.forEach(function(asteroid, asteroidI){
        if (asteroid.isCollidedWith(bullet)) {
          removeTheseBullets.push(bulletI);
          removeTheseAsteroids.push(asteroidI);
        }
      });
    });
    removeTheseBullets.forEach(function(bullet){
      that.bullets.splice(bullet, 1);
    });
    removeTheseAsteroids.forEach(function(asteroid){
      that.asteroids.splice(asteroid, 1);
      that.hitAsteroids += 1;
    });
  };
	
	Game.prototype.step = function() {
		this.move();
		this.draw();
		this.checkCollision();
		this.checkShots();
		this.cleanUp();
		this.resetAsteroids();
		this.showScore();
	};
	
  Game.prototype.showScore = function() {
    this.context.fillStyle = "white";
    this.context.font = "normal 18pt Arial";
    this.context.fillText("Score: " + this.hitAsteroids, SCORE_X, SCORE_Y);
  };

	
  Game.prototype.checkOutOfBounds = function(array) {
    var that = this;
    this.checkRemove(array, function(item) {
      return that.isOutOfBounds(item);
    });
  };
	
  Game.prototype.checkRemove = function(array, callback) {
    var removeThese = [];
    var that = this;

    array.forEach(function(item, itemI) {
      if (callback(item)) {
        removeThese.push(itemI);
      }
    });
    removeThese.forEach(function(item){
      array.splice(item, 1);
    });
  };
	
  Game.prototype.isOutOfBounds = function (moveableObject) {
    if (moveableObject.pos[0] > DIM_X || moveableObject.pos[1] > DIM_Y ||
        moveableObject.pos[0] < 0 || moveableObject.pos[1] < 0) {
      return true;
    }
    return false;
  };
	
  Game.prototype.resetAsteroids = function() {
    var asteroidsNeeded = NUM_ASTEROIDS - this.asteroids.length;
    if (asteroidsNeeded > 0) {
      this.asteroids = this.asteroids.concat(Game.addAsteroids(asteroidsNeeded, 
				                       							 this.ship.pos, ASTEROID_RADIUS, ASTEROID_COLOR));
    }
  };
	
	Game.prototype.start = function() {
		this.bindKeyHandlers();
    this.ship.power(1);
		this.interval = setInterval(Game.prototype.step.bind(this), FPS);
	};
	
	Game.prototype.stop = function() {
		alert("Game Over. Final Score:" + this.hitAsteroids);
		clearInterval(this.interval);
	};
	
})(this);