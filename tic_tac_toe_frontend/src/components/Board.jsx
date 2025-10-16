import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board component
 * Renders a 3x3 grid of squares. Highlights winning line and disables interaction on game over.
 * @param {Object} props
 * @param {Array<string|null>} props.squares - The current board state.
 * @param {(index:number)=>void} props.onPlay - Handler when a square is clicked.
 * @param {boolean} props.disabled - Whether input is disabled (after game over).
 * @param {number[]|null} props.winningLine - Indices of the winning line to highlight.
 */
export default function Board({ squares, onPlay, disabled, winningLine }) {
  const renderSquare = (i) => {
    const isWinning = Array.isArray(winningLine) && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onPlay(i)}
        disabled={disabled || Boolean(squares[i])}
        highlight={isWinning}
        ariaLabel={`Cell ${i + 1}, ${squares[i] ? `occupied by ${squares[i]}` : 'empty'}`}
      />
    );
  };

  return (
    <section className="board-wrapper">
      <div className="board" role="grid" aria-label="Tic Tac Toe Board">
        {[0, 1, 2].map((r) => (
          <div className="board-row" role="row" key={r}>
            {[0, 1, 2].map((c) => {
              const idx = r * 3 + c;
              return (
                <div role="gridcell" key={idx} aria-selected={false}>
                  {renderSquare(idx)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
