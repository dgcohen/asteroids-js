import React from 'react';

export default function Square(props) {
  return (
    <div className={"square " + props.shade} onClick={props.onClick}>
      <div className="piece" style={props.style}></div>
    </div>
  )
}