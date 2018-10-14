(function(root) {
	"use strict";
	
	var SPEED_FACTOR = 2;
	
	var Asteroids = root.Asteroids = root.Asteroids || {};
	
	var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
		Asteroids.MovingObject.call(this, pos, vel, radius, color);
		this.img = new Image();
		this.img.src = 'img/asteroid.png'
	};
	
  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY, shipPos, radius, color) {
		
    var posX = Math.floor(Math.random() * dimX);
    var posY = Math.floor(Math.random() * dimY);
		
		var xDiff = posX - shipPos[0];
		var yDiff = posY - shipPos[1];
		
		if (xDiff > 0 && xDiff < 100) {
			posX += 100;
		} else if (xDiff < 0 && xDiff > -100) {
			posX -= 100;
		} else if (yDiff > 0 && yDiff < 100) {
			posY += 100;
		} else if (yDiff < 0 && yDiff > -100) {
			posY -= 100;
		};
		
    var vel = [Asteroid.randomVec(), Asteroid.randomVec()];
    return new Asteroid([posX, posY], vel, radius, color);
  };
	
  Asteroid.randomVec = function() {
    var vel = Math.random() * SPEED_FACTOR + 1;
    vel *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return vel;
  };
})(this);