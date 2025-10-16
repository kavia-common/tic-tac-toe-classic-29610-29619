import React, { useMemo, useState } from 'react';
import './index.css';
import './styles/theme.css';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';

// PUBLIC_INTERFACE
export default function App() {
  /** This is the root component for the Tic Tac Toe app. It manages game state, score tracking, and renders UI. */

  // Game state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningLine, setWinningLine] = useState(null);

  // Derived state
  const winnerData = useMemo(() => calculateWinner(squares), [squares]);
  const winner = winnerData?.winner ?? null;
  const isDraw = !winner && squares.every((s) => s !== null);

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a draw!";
    return `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }, [winner, isDraw, xIsNext]);

  // Handle a move
  const handlePlay = (index) => {
    if (squares[index] || winner || isDraw) return; // ignore if occupied or game over
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // Check for win and set scores/line
    const w = calculateWinner(nextSquares);
    if (w?.winner) {
      setWinningLine(w.line);
      setScores((prev) => ({ ...prev, [w.winner]: prev[w.winner] + 1 }));
    }
  };

  // PUBLIC_INTERFACE
  const newRound = () => {
    /** Clears only the board, keeps the session scores. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine(null);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    /** Clears the board and resets the scores. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setScores({ X: 0, O: 0 });
    setWinningLine(null);
  };

  return (
    <div className="app-root">
      <main className="app-container">
        <header className="app-header">
          <h1 className="app-title" aria-label="Tic Tac Toe">Tic Tac Toe</h1>
          <p className="app-subtitle">Ocean Professional</p>
        </header>

        <section
          className="status"
          aria-live="polite"
          aria-atomic="true"
          role="status"
        >
          <span className={`badge ${winner ? 'badge-success' : isDraw ? 'badge-secondary' : 'badge-primary'}`}>
            {statusText}
          </span>
        </section>

        <Board
          squares={squares}
          onPlay={handlePlay}
          disabled={Boolean(winner) || isDraw}
          winningLine={winningLine}
        />

        <Scoreboard scores={scores} />

        <Controls onNewRound={newRound} onReset={resetGame} gameOver={Boolean(winner) || isDraw} />
      </main>
      <footer className="app-footer">
        <span>Local two-player game • No data is stored beyond this session</span>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * calculateWinner
 * Returns winner information if present.
 * @param {Array<string|null>} sq - The board squares array (length 9).
 * @returns {{winner: 'X'|'O', line: number[]}|null}
 */
function calculateWinner(sq) {
  /** Determine if there is a winner on the board. Returns the winner and the winning line. */
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { winner: sq[a], line: [a, b, c] };
    }
  }
  return null;
}
