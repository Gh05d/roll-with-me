import React from "react";
import { Helmet } from "react-helmet";

import Modal from "./Modal";

import "./styles/Deathroll.css";

const DEFAULT_VALUE = 100;

const Deathroll = () => {
  const [playerOne, setPlayerOne] = React.useState("Domme");
  const [playerTwo, setPlayerTwo] = React.useState("Müller");

  const [show, toggle] = React.useState(false);
  const [roll, setRoll] = React.useState(DEFAULT_VALUE);
  const [rolls, setRolls] = React.useState([]);

  function handleClick() {
    const value = Math.floor(Math.random() * roll + 1);
    setRoll(value);
    setRolls(state => [...state, value]);
    toggle(true);
  }

  function handleChange(e) {
    const newValue = e.target.value;
    setRoll(newValue);
  }

  function reset() {
    setRoll(DEFAULT_VALUE);
    setRolls([]);
  }

  function renderRolls(equal) {
    return rolls.map((value, i) => {
      if (equal) {
        if (i % 2 == 0) {
          var parsedValue = value;
        }
      } else {
        if (i % 2 != 0) {
          var parsedValue = value;
        }
      }

      if (!parsedValue) return null;

      return (
        <React.Fragment key={`${parsedValue}-${i}`}>
          <span>{parsedValue}</span>
          {parsedValue == 1 && <span className="loser">Loser</span>}
        </React.Fragment>
      );
    });
  }

  const renderPlayerData = (name, mode, onChange) => (
    <div className="player-data">
      <input
        disabled={rolls.length}
        value={name}
        onChange={e => onChange(e.target.value)}
      />
      <div>
        <span>Rolls: </span>
        {renderRolls(mode)}
      </div>
    </div>
  );

  const renderResult = () => {
    return (
      <div className={`result ${roll == 1 ? "skull" : ""}`}>
        <span>{`${rolls.length % 2 == 0 ? playerTwo : playerOne} rolled`}</span>
        <span>{roll}</span>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Helmet>
        <title itemProp="name" lang="en">
          Two players roll till one reaches 1
        </title>

        <meta
          name="description"
          content="Deathroll is a game played by two players. You selected a starting number and both players roll alternately until one reaches 1."
        />
      </Helmet>

      <main id="deathroll">
        <h1>
          Deathroll{" "}
          <span aria-label="skull and dice" role="img">
            💀🎲
          </span>
        </h1>

        {renderPlayerData(playerOne, true, setPlayerOne)}
        {renderPlayerData(playerTwo, false, setPlayerTwo)}

        <h2>Rolls</h2>
        <input
          disabled={rolls.length}
          onChange={handleChange}
          value={roll}
          type="number"
        />

        <button disabled={roll == 1} onClick={handleClick}>
          Roll
        </button>
        <button onClick={reset}>Reset</button>

        {show && (
          <Modal show={show} close={() => toggle(false)}>
            {renderResult()}
          </Modal>
        )}
      </main>
    </React.Fragment>
  );
};

export default Deathroll;
