(function(root) {
	"use strict";
	
	var Asteroids = root.Asteroids = root.Asteroids || {};
	var Bullet = Asteroids.Bullet;
	
	var MAX_POWER = 3;
	
	var Ship = Asteroids.Ship = function(pos, radius, color) {
		Asteroids.MovingObject.call(this, pos, [0, 0], radius, color);
		this.currentDirection = 0;
		this.pos = pos;
		this.speed = 0;
		this.img = new Image();
		this.img.src = 'img/ship.png'
	};
	Ship.inherits(Asteroids.MovingObject);
	
  Ship.prototype.fireBullet = function(){
    return new Bullet(this.pos, this.vel, 2, "white");
  };
	
	Ship.prototype.power = function(impulse) {
		this.speed += impulse;
		if (this.speed < 0) {
			this.speed = 0;
		} else if (this.speed > MAX_POWER) {
			this.speed = MAX_POWER;
		}
		this.updateVelocity();
	};
	
	Ship.prototype.rotate = function(clockwise) {
		this.currentDirection += (clockwise) ? 375 : 345;
		this.currentDirection %= 360;
		this.updateVelocity();
	};
	
	Ship.prototype.rotateClockwise = function(){
		this.rotate(true);
	};
	
	Ship.prototype.rotateCounterClockwise = function(){
		this.rotate(false);
	};
	
	Ship.prototype.updateVelocity = function() {
		var degrees = this.currentDirection;
		
		this.vel[0] = Math.cos(degrees * (Math.PI / 180)) * this.speed;
		this.vel[1] = Math.sin(degrees * (Math.PI / 180)) * this.speed;
		
	};
	
})(this);