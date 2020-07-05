import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  renderSquare(i) {
    //this.props.squares[i]
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderAllSquare = () => {
    let rows = [];
    let squaresOfRow = [];
    let row;
    let n = 20; // số hàng và cột
    for (let i = 0; i < n; i++) {
      squaresOfRow = [];
      row = (
        <div key={i} className="board-row">
          {squaresOfRow}
        </div>
      );
      for (let j = 0; j < n; j++) {
        //console.log(this.renderSquare(i * n + j));
        squaresOfRow.push(this.renderSquare(i * n + j));
      }
      rows.push(row);
    }
    return rows;
  };
  render() {
    let squares = this.renderAllSquare();
    return <div>{squares}</div>;
  }
}
export default Board;
