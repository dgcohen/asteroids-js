import React from 'react';
import Square from './square';

export default class CapturedPieces extends React.Component {
  renderPiece(piece) {
    return(
      <Square
        piece = {piece}
        style = {piece.style}
      />
    )
  }

  render() {
    return (
      <div className="captured-pieces">
        <div className="white-pieces">
          {this.props.whitePieces.map((piece, index) => this.renderPiece(piece))}
        </div>
        <div className="black-pieces">
          {this.props.blackPieces.map((piece, index) => this.renderPiece(piece))}
        </div>
      </div>
    )
  }
}