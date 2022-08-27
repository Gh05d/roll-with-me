import React from "react";

import "../styles/Diffroll.css";

const DiffrollSetup = props => {
  const { players, addPlayer, minNumber, removePlayer } = props;

  return (
    <div id="diffroll-setup">
      <ul className="players">
        {Object.values(players).map((player, i) => (
          <li key={player.id}>
            <input
              value={player.name}
              name={player.id}
              onChange={props.handleChange}
              title="Player name"
              aria-label="Player name"
            />
            {i + 1 == Object.values(players).length && (
              <button
                title="Add player"
                onClick={addPlayer}
                aria-label="Add player"
                className="icon-button">
                <i className="fa fa-user-plus" />
              </button>
            )}

            {i > 1 && (
              <button
                title={`Remove ${player.name}`}
                onClick={() => removePlayer(player.id)}
                aria-label={`Remove ${player.name}`}
                className="icon-button">
                <i className="fa fa-user-minus" />
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="numbers">
        <input
          title="Min number"
          aria-label="Min number"
          step={1}
          type="number"
          min={1}
          value={minNumber}
          onChange={e => props.setMinNumber(e.target.value)}
        />
        <input
          title="Max number"
          aria-label="Max number"
          step={10}
          type="number"
          min={minNumber}
          value={props.maxNumber}
          onChange={e => props.setMaxNumber(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button onClick={props.startGame} className="start-button">
          Start Game
        </button>

        <button onClick={props.reset} className="start-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default DiffrollSetup;
