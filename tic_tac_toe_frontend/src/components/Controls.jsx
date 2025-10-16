import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Controls component
 * Renders buttons for New Round and Reset Game.
 * @param {Object} props
 * @param {()=>void} props.onNewRound - Clears the board, keeps scores.
 * @param {()=>void} props.onReset - Clears board and scores.
 * @param {boolean} props.gameOver - Whether the game is currently over (used for button emphasis).
 */
export default function Controls({ onNewRound, onReset, gameOver }) {
  return (
    <section className="controls">
      <button
        type="button"
        className={`btn ${gameOver ? 'btn-primary' : 'btn-secondary'}`}
        onClick={onNewRound}
        aria-label="Start a new round"
      >
        New Round
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={onReset}
        aria-label="Reset game and scores"
      >
        Reset Game
      </button>
    </section>
  );
}
