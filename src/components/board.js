import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  renderRow = (row) => {
    return row.map((square, index) => {
      return(
        <Square
        key = { index }
        piece = { this.props.squares[square.index] }
        style = { this.props.squares[square.index] ? this.props.squares[square.index].style : null }
        shade = { square.shade }
        onClick = { () => this.props.onClick(square.index) }
      />
      )
    });
  };

  renderBoard = (rows) => {
    return rows.map((row, index) => {
      return(
        <div
        className="row"
        key={index}
        >
        {this.renderRow(row)}
        </div>
      );
    });
  };

  render () {
    const rows = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        const shade = (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? "light" : "dark";
        row.push({
          index: (i * 8) + j,
          shade: shade
        });
      }

      rows.push(row);
    }

    return (
      <div className="board">
        { this.renderBoard(rows) }
      </div>
    );
  };
}

function isEven(number) {
  return number % 2 === 0;
};