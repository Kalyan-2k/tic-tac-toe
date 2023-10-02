import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squareValue, setSquareValue] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squareValue[i] || calculateWinner(squareValue)) {
      return;
    }
    const nextSquare = squareValue.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    setSquareValue(nextSquare);
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(squareValue);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squareValue[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squareValue[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squareValue[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squareValue[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squareValue[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squareValue[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squareValue[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squareValue[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squareValue[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squareValue) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squareValue[a] &&
      squareValue[a] === squareValue[b] &&
      squareValue[a] === squareValue[c]
    ) {
      return squareValue[a];
    }
  }
  return null;
}
