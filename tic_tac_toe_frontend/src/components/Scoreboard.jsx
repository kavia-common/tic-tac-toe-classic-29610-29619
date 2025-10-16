import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Scoreboard component
 * Displays session scores for X and O.
 * @param {{X:number,O:number}} props.scores - Current scores for players.
 */
export default function Scoreboard({ scores }) {
  return (
    <section className="scoreboard" aria-label="Scoreboard">
      <div className="score-card">
        <span className="score-label">Player X</span>
        <span className="score-value score-x" aria-live="polite">{scores.X}</span>
      </div>
      <div className="score-card">
        <span className="score-label">Player O</span>
        <span className="score-value score-o" aria-live="polite">{scores.O}</span>
      </div>
    </section>
  );
}
