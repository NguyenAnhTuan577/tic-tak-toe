import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  // ham khoi tao
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null) // squares là mảng các giá trị X/O
        }
      ], // Mang cac trang thai cua Board
      stepNumber: 0, //vi tri step dang display
      xIsNext: true, // nguoi choi tiep theo(X/O), bằng true là X, false là O
      choosedSquare: -1
    };
  }
  // ham tim nguoi chien thang dua tren 8 truong hop chien thang
  calculateWinner = squares => {
    //console.log(squares);
    let choosedSquare = this.state.choosedSquare;
    if (choosedSquare === -1) return null;
    let calculteArray1 = [];
    let calculteArray2 = [];
    let calculteArray3 = [];
    let calculteArray4 = [];
    let choosedSquareRowIndex = Math.floor(choosedSquare / 20); // vị trí của ô đang được chọn(hàng)
    let choosedSquareColIndex = choosedSquare % 20; // vị trí của ô đang được chọn(cột)
    let left = choosedSquareColIndex;
    let right = 19 - choosedSquareColIndex;
    let up = choosedSquareRowIndex;
    let down = 19 - choosedSquareRowIndex;
    let canh1 = 0;
    let canh2 = 0;
    if (right > 4) right = 4;
    if (left > 4) left = 4;
    if (up > 4) up = 4;
    if (down > 4) down = 4;
    let temp = 0;
    // thêm các ô chúng ta cần xét vào 4 mảng
    // dấu sắc
    canh1 = Math.min(right, up);
    canh2 = Math.min(left, down);
    temp = choosedSquare - 19 * canh1;
    for (let i = 0; i < canh1 + canh2 + 1; i++) {
      calculteArray1.push(temp);
      temp = temp + 19;
    }
    // dấu huyền
    canh1 = Math.min(left, up);
    canh2 = Math.min(right, down);
    // console.log(left);
    // console.log(right);
    // console.log(up);
    // console.log(down);
    // console.log(canh1);
    // console.log(canh2);
    temp = choosedSquare - 21 * canh1;
    for (let i = 0; i < canh1 + canh2 + 1; i++) {
      calculteArray2.push(temp);
      temp = temp + 21;
    }
    // chữ I
    canh1 = up;
    canh2 = down;
    temp = choosedSquare - 20 * up;
    for (let i = 0; i < canh1 + canh2 + 1; i++) {
      calculteArray3.push(temp);
      temp = temp + 20;
    }
    // dấu trừ
    canh1 = left;
    canh2 = right;
    temp = choosedSquare - canh1;
    for (let i = 0; i < canh1 + canh2 + 1; i++) {
      calculteArray4.push(temp);
      temp = temp + 1;
    }
    // xác nhận chiến thắng
    let cnt = 0;
    let dinh1 = 0; // đỉnh thứ 1 của hàng 5 ô trùng nhau liên tục (XXXXX/OOOOO)
    let dinh2 = 0; // đỉnh thứ 2 của hàng 5 ô trùng nhau liên tục (XXXXX/OOOOO)
    let endSquare = 0;
    let unexpectedValue = "O";
    // Lượt kiểm định số 1
    for (let i = 0; i < calculteArray1.length; i++) {
      if (squares[calculteArray1[i]] === squares[choosedSquare]) cnt++;
      else cnt = 0;
      if (cnt >= 5) {
        endSquare = calculteArray1[i];
        break;
      }
    }
    choosedSquareRowIndex = Math.floor(endSquare / 20); // vị trí của ô đang được chọn(hàng)
    choosedSquareColIndex = endSquare % 20; // vị trí của ô đang được chọn(cột)
    left = choosedSquareColIndex;
    right = 19 - choosedSquareColIndex;
    up = choosedSquareRowIndex;
    down = 19 - choosedSquareRowIndex;
    if (squares[endSquare] == "O") unexpectedValue = "X";
    canh1 = Math.min(right, up);
    canh2 = Math.min(left, down);
    if (canh1 >= 5) canh1 = 5;
    if (canh2 >= 1) canh2 = 1;
    if (canh1 === 5) dinh1 = endSquare - 19 * 5;
    else {
      dinh1 = -1;
      squares[-1] = unexpectedValue;
    }

    if (canh2 === 1) dinh2 = endSquare + 19;
    else {
      dinh2 = -2;
      squares[-2] = unexpectedValue;
    }
    if (cnt >= 5) {
      if (
        squares[dinh1] != unexpectedValue ||
        squares[dinh2] != unexpectedValue
      )
        return squares[choosedSquare];
    }
    // Lượt kiểm định số 2
    cnt = 0;
    for (let i = 0; i < calculteArray2.length; i++) {
      if (squares[calculteArray2[i]] === squares[choosedSquare]) cnt++;
      else cnt = 0;
      if (cnt >= 5) {
        endSquare = calculteArray2[i];
        break;
      }
    }
    console.log(calculteArray2);
    console.log(squares[choosedSquare]);
    console.log(cnt);
    if (squares[endSquare] == "O") unexpectedValue = "X";
    console.log("unexpected value: " + unexpectedValue);

    canh1 = Math.min(left, up);
    canh2 = Math.min(right, down);
    if (canh1 >= 5) canh1 = 5;
    if (canh2 >= 1) canh2 = 1;
    if (canh1 === 5) dinh1 = endSquare - 21 * 5;
    else {
      dinh1 = -1;
      squares[-1] = unexpectedValue;
    }

    if (canh2 === 1) dinh2 = endSquare + 21;
    else {
      dinh2 = -2;
      squares[-2] = unexpectedValue;
    }
    console.log("dinh1: " + dinh1 + "-----" + squares[dinh1]);
    console.log("dinh2: " + dinh2 + "------" + squares[dinh2]);
    console.log(squares);
    if (cnt >= 5) {
      if (
        squares[dinh1] != unexpectedValue ||
        squares[dinh2] != unexpectedValue
      )
        return squares[choosedSquare];
    }

    // Lượt kiểm định số 3
    cnt = 0;
    for (let i = 0; i < calculteArray3.length; i++) {
      if (squares[calculteArray3[i]] === squares[choosedSquare]) cnt++;
      else cnt = 0;
      if (cnt >= 5) {
        endSquare = calculteArray3[i];
        break;
      }
    }
    choosedSquareRowIndex = Math.floor(endSquare / 20); // vị trí của ô đang được chọn(hàng)
    choosedSquareColIndex = endSquare % 20; // vị trí của ô đang được chọn(cột)
    left = choosedSquareColIndex;
    right = 19 - choosedSquareColIndex;
    up = choosedSquareRowIndex;
    down = 19 - choosedSquareRowIndex;
    if (squares[endSquare] == "O") unexpectedValue = "X";
    canh1 = up;
    canh2 = down;
    if (canh1 >= 5) canh1 = 5;
    if (canh2 >= 1) canh2 = 1;
    if (canh1 === 5) dinh1 = endSquare - 20 * 5;
    else {
      dinh1 = -1;
      squares[-1] = unexpectedValue;
    }

    if (canh2 === 1) dinh2 = endSquare + 20;
    else {
      dinh2 = -2;
      squares[-2] = unexpectedValue;
    }
    if (cnt >= 5) {
      if (
        squares[dinh1] != unexpectedValue ||
        squares[dinh2] != unexpectedValue
      )
        return squares[choosedSquare];
    }
    // Lượt kiểm định số 4
    cnt = 0;
    for (let i = 0; i < calculteArray4.length; i++) {
      if (squares[calculteArray4[i]] === squares[choosedSquare]) cnt++;
      else cnt = 0;
      if (cnt >= 5) {
        endSquare = calculteArray4[i];
        break;
      }
    }
    choosedSquareRowIndex = Math.floor(endSquare / 20); // vị trí của ô đang được chọn(hàng)
    choosedSquareColIndex = endSquare % 20; // vị trí của ô đang được chọn(cột)
    left = choosedSquareColIndex;
    right = 19 - choosedSquareColIndex;
    up = choosedSquareRowIndex;
    down = 19 - choosedSquareRowIndex;
    if (squares[endSquare] == "O") unexpectedValue = "X";
    canh1 = left;
    canh2 = right;
    if (canh1 >= 5) canh1 = 5;
    if (canh2 >= 1) canh2 = 1;
    if (canh1 === 5) dinh1 = endSquare - 5;
    else {
      dinh1 = -1;
      squares[-1] = unexpectedValue;
    }

    if (canh2 === 1) dinh2 = endSquare + 1;
    else {
      dinh2 = -2;
      squares[-2] = unexpectedValue;
    }
    if (cnt >= 5) {
      if (
        squares[dinh1] != unexpectedValue ||
        squares[dinh2] != unexpectedValue
      )
        return squares[choosedSquare];
    }
    return null;
  };
  // ham xu ly click
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); //  (hành động hay) lấy history
    const current = history[history.length - 1]; //squares gần nhất
    const squares = current.squares.slice(); // lấy giá trị của các squares gần nhất
    // console.log("Các giá trị được lấy trước khi click được xử lý!");
    // console.log(history);
    // console.log(current);
    // console.log(squares);
    // nếu đã có người chiến thắng hoặc ô đó đã được đánh thì không cho chọn nữa
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O"; // gán giá trí X/O cho vị trí được click
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      choosedSquare: i
    });
  }
  // hàm xử lý việc nhảy đến các trạng thái có trong lịch sử
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  // hàm render
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    //console.log(this.state.stepNumber);
    //biểu diễn history trên web
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    //Thiết lập status trạng thái của X và O(ai chiến thắng)
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    //trả về html
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
