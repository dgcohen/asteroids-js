import React, { Component } from 'react';
import $ from 'jquery';


// components

class Game extends Component {

  render() {
    return (
      <div className="main">
        <header>
          <h1>Asteroids.js</h1>
          <div className="controls">
            <h2>Controls</h2>
            <ul>
              <li>F: Speed up</li>
              <li>D: Slow Down</li>
              <li>K: Rotate clockwise </li>
              <li>J: Rotate counterclockwise</li>
              <li>Space: Fire</li>
            </ul>
          </div>
        </header>

        <canvas width="800" height="400"></canvas>
        
        <footer>
          <p>Built by Diego Cohen</p>
        </footer>
        <a href="http://www.diegocohen.com/" target="_blank">www.diegocohen.com</a>
      </div>
    );
  }
}

export default Game;
