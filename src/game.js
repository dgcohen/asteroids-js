import React, { Component } from 'react';
import $ from 'jquery'; 

// components

class Game extends Component {

  render() {
    return (
      <div className="main">
        <h1>Asteroids.js</h1>
        <canvas width="1000" height="500"></canvas>
        <h2>Controls</h2>
        <ul>
          <li>F: Speed up</li>
          <li>D: Slow Down</li>
          <li>K: Rotate clockwise </li>
          <li>J: Rotate counterclockwise</li>
          <li>Space: Fire</li>
        </ul>
        <a href="http://www.diegocohen.com/" target="_blank">www.diegocohen.com</a>
      </div>
    );
  }
}

export default Game;
