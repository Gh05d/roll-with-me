import React from "react";

import "../styles/Diffroll.css";

const DiffrollSetup = props => {
  const { players, addPlayer, minNumber, removePlayer } = props;

  const playersArray = Object.values(players);

  return (
    <div id="diffroll-setup">
      <ul className="players">
        {playersArray.map((player, i) => (
          <li key={player.id}>
            <input
              value={player.name}
              name={player.id}
              onChange={props.handleChange}
              title="Player name"
              aria-label="Player name"
            />

            <div>
              {player.balance}{" "}
              <i
                className={`fa-solid fa-coins ${
                  player.balance > 0 ? "positive" : player.balance < 0 ? "negative" : ""
                }`}></i>
            </div>

            {playersArray.length > 1 && (
              <button
                title={`Remove ${player.name}`}
                onClick={() => removePlayer(player.id)}
                aria-label={`Remove ${player.name}`}
                className="icon-button remove-player">
                <i className="fa fa-user-minus" />
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            title="Add player"
            onClick={addPlayer}
            aria-label="Add player"
            className="icon-button">
            <i className="fa fa-user-plus" />
          </button>
        </li>
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

      <label>
        <input
          type="checkbox"
          checked={props.automatic}
          onChange={() => props.toggleMode(state => !state)}
        />
        Automatic rolls
      </label>

      <div className="buttons">
        <button
          disabled={playersArray.length <= 1}
          onClick={props.startGame}
          className="start-button">
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
