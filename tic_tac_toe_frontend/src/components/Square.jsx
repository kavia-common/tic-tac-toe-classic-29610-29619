import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square component
 * Represents a single cell in the tic tac toe board.
 * @param {Object} props
 * @param {'X'|'O'|null} props.value - The symbol to display.
 * @param {()=>void} props.onClick - Click handler.
 * @param {boolean} props.disabled - Whether the square is disabled.
 * @param {boolean} props.highlight - Whether to highlight the square (winning line).
 * @param {string} [props.ariaLabel] - Accessible label for the button.
 */
export default function Square({ value, onClick, disabled, highlight, ariaLabel }) {
  const classes = [
    'square',
    value === 'X' ? 'square-x' : '',
    value === 'O' ? 'square-o' : '',
    highlight ? 'square-win' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className="square-value">{value}</span>
    </button>
  );
}
