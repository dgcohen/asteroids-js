import React, { Component } from 'react';
import Board from './components/board';
import initializeBoard from './helpers/initializeBoard.js';

// components

class Game extends Component {
  constructor () {
    super();
    this.state = {
      squares: initializeBoard(),
      turn: 'white',
      player: 1,
      sourceSelection: -1,
      status: '',
      capturedWhitePieces: [],
      capturedBlackPieces: [],
    }
  }

  handleClick(index) {
    // Create shallow copy of board so we don't alter state
    const squares = this.state.squares.slice();

    if (this.state.sourceSelection < 0) {
      // If wrong player's piece or a blank square is selected
      if (!squares[index] || squares[index].player !== this.state.player) {
        this.setState({ status: "Player " + this.state.player + "'s turn. Please select a " + this.state.turn + " piece."});
      }
      else {
        this.setState({
          status: "Choose destination for selected piece",
          sourceSelection: index
        });
      }
    }
    else {
      if (squares[index] && squares[index].player === this.state.player) {
        this.setState({
          status: "Invalid move: you cannot move to a square occupied by your own piece.",
          sourceSelection: -1,
        });
      }
      else {
        const capturedWhitePieces = this.state.capturedWhitePieces.slice();
        const capturedBlackPieces = this.state.capturedBlackPieces.slice();
        const holdsEnemy = !!squares[index];
        const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, index, holdsEnemy);
        const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, index);
        const isSlidingPathClear = this.isSlidingPathClear(srcToDestPath);

        if (isMovePossible && isSlidingPathClear) {
          if (squares[index] !== null) {
            if (squares[index].player === 1) {
              capturedWhitePieces.push(squares[index]);
            }
            else {
              capturedBlackPieces.push(squares[index]);
            }
          }

          squares[index] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;

          this.setState({
            sourceSelection: -1,
            squares: squares,
            capturedBlackPieces: capturedBlackPieces,
            capturedWhitePieces: capturedWhitePieces,
          });

          if (!this.isCheckmate(this.state.player, squares)) {
            let player = this.state.player === 1 ? 2 : 1;
            let turn = this.state.turn === "white" ? "black" : "white";

            this.setState({
              player: player,
              turn: turn,
              status: '',
            });
          }
          else {
            let player = this.state.player;

            this.setState({
              status: player === 1 ? 'Checkmate. White wins.' : 'Checkmate. Black wins',
            });
          }
        }
        else {
          this.setState({
            status: "Invalid move",
            sourceSelection: -1,
          });
        }
      }
    }
  }

  /**
   * Check that path is clear for non-jumping pieces.
   * @return {Boolean}
   */
  isSlidingPathClear(srcToDestPath){
    let slidingIsPathClear = true;
    for(let i = 0; i < srcToDestPath.length; i++){
      if(this.state.squares[srcToDestPath[i]] !== null){
        slidingIsPathClear = false;
      }
    }
    return slidingIsPathClear;
  }

  /**
   * Check if move is a checkmate.
   * @return {Boolean}
   */
  isCheckmate(currentPlayer, squares){
    let king = null;
    let kingIndex = null;
    let possibleKingMoves = [];
    let currentPlayerPieces = [];

    // find other player's king
    squares.forEach((square, index) => {
      if (square && square.type === 'king' && square.player !== currentPlayer) {
        kingIndex = index;
        king = square;
      };
      if (square && square.player === currentPlayer) {
        currentPlayerPieces.push(index);
      }
    });

    // find clear spaces around king
    squares.forEach((square, index) => {
      if (king.isMovePossible(kingIndex, index)) {
        if (square && square.player === currentPlayer) {
          possibleKingMoves.push(index);
        }
        else if (square == null) {
          possibleKingMoves.push(index);
        }
      };
    });
    if (possibleKingMoves.length) {
      let safeMoves = possibleKingMoves.length;
      possibleKingMoves.forEach((kingMove) => {
        currentPlayerPieces.forEach((attackerPosition) => {
          let isMovePossible = squares[attackerPosition].isMovePossible(attackerPosition, kingMove, true);
          let srcToDestPath = squares[attackerPosition].getSrcToDestPath(attackerPosition, kingMove);
          let isSlidingPathClear = this.isSlidingPathClear(srcToDestPath);
          if (isMovePossible && isSlidingPathClear) {
            safeMoves -= 1;
          };
        });
      });
      if (safeMoves === 0) {
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <div className="main">
        <h1>Asteroids JS</h1>
        <div className="game-container">
        <Board
          squares = { this.state.squares }
          onClick = { (index) => this.handleClick(index) }
        />
        <div className="game-info">
          <div className="text-container">
            <div className={this.state.turn + " turn-info"}>
              <h3>{this.state.player === 1 ? 'White\'s Turn' : 'Black\'s Turn'} to move.</h3>
            </div>
            <div className="game-status">{this.state.status}</div>
          </div>
        </div>
        </div>
        <footer>
          <div className="text-container">
            <p>Built by Diego Cohen</p>
            <a href="http://www.diegocohen.com/" target="_blank">www.diegocohen.com</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Game;
