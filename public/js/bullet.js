(function(root) {
	"use strict";
	
	var Asteroids = root.Asteroids = root.Asteroids || {};
	var MovingObject = Asteroids.MovingObject;
	
	var SPEED_MULTIPLIER = 10;
	
	var Bullet = Asteroids.Bullet = function(pos, vel, radius, color) {
		var myVel = [];

		myVel.push(vel[0] * SPEED_MULTIPLIER);
		myVel.push(vel[1] * SPEED_MULTIPLIER);
		
		MovingObject.call(this, pos, myVel, radius, color);
	};
	Bullet.inherits(MovingObject);
		
})(this);