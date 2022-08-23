import React from "react";
import { Helmet } from "react-helmet";
import generateName from "sillyname";
import DiffrollResultModal from "./DiffrollResultModal";

import DiffrollResult from "./DiffrollResults";

import { generateID } from "./helpers";

import "./styles/Diffroll.css";

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 1000;

const Diffroll = () => {
  const [players, setPlayers] = React.useState({});
  const [minNumber, setMinNumber] = React.useState(DEFAULT_MIN);
  const [maxNumber, setMaxNumber] = React.useState(DEFAULT_MAX);
  const [started, toggle] = React.useState(false);
  const [show, setModal] = React.useState(false);
  const [decision, setDecision] = React.useState(null);
  const [results, setResults] = React.useState(null);

  React.useState(setDefaultPlayers, []);
  const animationDuration = 600;

  function setDefaultPlayers() {
    setPlayers(() => {
      const id1 = generateID();
      const id2 = generateID();

      return {
        [id1]: { name: "Triggerhappy Dommez", id: id1 },
        [id2]: { name: "This is no original Philly Steak - Müller", id: id2 },
      };
    });
  }

  function handleChange(e) {
    const id = e.target.name;

    setPlayers(state => ({
      ...state,
      [id]: { ...state[id], name: e.target.value },
    }));
  }

  function addPlayer() {
    setPlayers(state => {
      const id = generateID();

      return { ...state, [id]: { name: generateName(), id } };
    });
  }

  function removePlayer(id) {
    setPlayers(state => {
      const clone = { ...state };
      delete clone[id];
      return clone;
    });
  }

  function rollDice() {
    return Math.floor(Math.random() * (+maxNumber - +minNumber + 1)) + +minNumber;
  }

  const startGame = () => {
    const playersArray = Object.values(players);

    let highestRoll = +minNumber;
    let lowestRoll = +maxNumber;

    const rolls = playersArray.reduce((acc, cV) => {
      const roll = rollDice();
      acc[cV.id] = roll;

      if (roll > highestRoll) highestRoll = roll;
      if (roll < lowestRoll) lowestRoll = roll;

      return acc;
    }, {});
    const winners = [];
    const losers = [];

    for (const player of playersArray) {
      if (rolls[player.id] == highestRoll) winners.push(player);
      if (rolls[player.id] == lowestRoll) losers.push(player);
    }
    console.log("FIRE ~ file: Diffroll.jsx ~ line 88 ~ startGame ~ rolls", rolls);

    setResults(state => {
      const clone = state ? { ...state } : {};
      console.log("FIRE ~ file: Diffroll.jsx ~ line 69 ~ renderResult ~ clone", clone);

      Object.keys(rolls).forEach(playerID => {
        clone[playerID] = !clone[playerID]
          ? [rolls[playerID]]
          : [...clone[playerID], rolls[playerID]];
      });
      console.log(" ~ updatedResults", clone);

      return clone;
    });

    setDecision({
      winner: winners[0]?.name,
      loser: losers[0]?.name,
      amount: highestRoll - lowestRoll,
      highest: highestRoll,
      lowest: lowestRoll,
    });
    toggle(true);
    setTimeout(() => {
      setModal(true);
    }, playersArray.length * animationDuration * 2 + animationDuration);
  };

  const currentPlayers = React.useCallback(() => players, [players]);

  return (
    <React.Fragment>
      <Helmet>
        <title itemProp="name" lang="en">
          The player with the highest number wins
        </title>

        <meta
          name="description"
          content="Diffroll is a game played by many players. Every player rolls and the player with the lowest number has to pay the player with the highest number the difference between their rolls."
        />
      </Helmet>

      <main id="diffroll">
        <h1>Diffroll</h1>

        {started ? (
          <DiffrollResult
            animationDuration={animationDuration}
            players={currentPlayers()}
            results={results}
          />
        ) : (
          <div id="diffroll-setup">
            <ul className="players">
              {Object.values(players).map((player, i) => (
                <li key={player.id}>
                  <input
                    value={player.name}
                    name={player.id}
                    onChange={handleChange}
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
                onChange={e => setMinNumber(e.target.value)}
              />
              <input
                title="Max number"
                aria-label="Max number"
                step={10}
                type="number"
                min={minNumber}
                value={maxNumber}
                onChange={e => setMaxNumber(e.target.value)}
              />
            </div>

            <div className="buttons">
              <button onClick={startGame} className="start-button">
                Start Game
              </button>

              <button
                onClick={() => {
                  setDefaultPlayers();
                  setResults(null);
                  setDecision(null);
                  setMinNumber(DEFAULT_MIN);
                  setMaxNumber(DEFAULT_MAX);
                }}
                className="start-button">
                Reset
              </button>
            </div>
          </div>
        )}

        {show && (
          <DiffrollResultModal
            decision={decision}
            close={() => {
              setModal(false);
              toggle(false);
            }}
          />
        )}
      </main>
    </React.Fragment>
  );
};

export default Diffroll;
