import React from "react";
import { Helmet } from "react-helmet";
import generateName from "sillyname";

import DiffrollResultModal from "../components/diffroll/DiffrollResultModal";
import DiffrollResult from "../components/diffroll/DiffrollResults";
import DiffrollSetup from "./DiffrollSetup";

import "../styles/Diffroll.css";
import { generateID } from "../helpers";
import Modal from "../components/Modal";

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 1000;

const Diffroll = () => {
  const [players, setPlayers] = React.useState({});
  const [minNumber, setMinNumber] = React.useState(DEFAULT_MIN);
  const [maxNumber, setMaxNumber] = React.useState(DEFAULT_MAX);

  const [started, toggle] = React.useState(false);
  const [showDecision, toggleDecision] = React.useState(false);
  const [showReset, toggleReset] = React.useState(false);

  const [decision, setDecision] = React.useState(null);
  const [results, setResults] = React.useState(null);
  const [deletePlayerByID, toggleDeletion] = React.useState(null);

  const animationDuration = 100;

  React.useEffect(setDefaultPlayers, []);

  function startGame() {
    const playersArray = Object.values(players);

    let highestRoll = +minNumber;
    let lowestRoll = +maxNumber;

    const rolls = playersArray.reduce((acc, cV) => {
      const roll = Math.floor(Math.random() * (+maxNumber - +minNumber + 1)) + +minNumber;
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

    setResults(state => {
      const clone = state ? { ...state } : {};

      Object.keys(rolls).forEach(playerID => {
        clone[playerID] = !clone[playerID]
          ? [rolls[playerID]]
          : [...clone[playerID], rolls[playerID]];
      });

      return clone;
    });

    setDecision({
      winners,
      losers,
      amount: highestRoll - lowestRoll,
      highest: highestRoll,
      lowest: lowestRoll,
    });
    toggle(true);
    setTimeout(
      () => toggleDecision(true),
      playersArray.length * animationDuration * 2 + animationDuration
    );
  }

  function reset() {
    setResults(null);
    setDecision(null);
    setDefaultPlayers();
  }

  function addPlayer() {
    setPlayers(state => {
      const id = generateID();

      return { ...state, [id]: { name: generateName(), id, balance: 0 } };
    });
  }

  function removePlayer(id) {
    if (players[id]?.balance != 0) return toggleDeletion(id);

    removePlayer4Real(id);
  }

  function removePlayer4Real(id) {
    setPlayers(state => {
      const clone = { ...state };
      delete clone[id];
      return clone;
    });
  }

  function handleChange(e) {
    const id = e.target.name;

    setPlayers(state => ({
      ...state,
      [id]: { ...state[id], name: e.target.value },
    }));
  }

  function finish({ winner, loser }) {
    toggleDecision(false);
    toggle(false);

    setPlayers(state => ({
      ...state,
      [winner.id]: { ...winner, balance: winner.balance + decision.amount },
      [loser.id]: { ...loser, balance: loser.balance - decision.amount },
    }));
  }

  const closeDeleteModal = () => toggleDeletion(null);
  const closeResetModal = () => toggleReset(null);

  function setDefaultPlayers() {
    setPlayers(() => {
      const id1 = generateID();
      const id2 = generateID();

      return {
        [id1]: { name: "Triggerhappy Dommez", id: id1, balance: 0 },
        [id2]: { name: "This is no original Philly Steak - Müller", id: id2, balance: 0 },
      };
    });
  }

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
          <DiffrollSetup
            players={players}
            addPlayer={addPlayer}
            removePlayer={removePlayer}
            handleChange={handleChange}
            startGame={startGame}
            minNumber={minNumber}
            setMinNumber={setMinNumber}
            maxNumber={maxNumber}
            setMaxNumber={setMaxNumber}
            reset={() => toggleReset(true)}
          />
        )}

        {showDecision && <DiffrollResultModal close={finish} {...decision} />}
        {deletePlayerByID && (
          <Modal className="diffroll-confirm-modal" close={closeDeleteModal}>
            <h2>Delete Player</h2>
            <div>Do you really want to delete the player</div>

            <div>
              <em>{players[deletePlayerByID]?.name}</em>
            </div>

            <div>
              He has an outstanding balance of <b>{players[deletePlayerByID]?.balance}</b>
            </div>

            <div className="buttons">
              <button
                onClick={() => {
                  removePlayer4Real(deletePlayerByID);
                  closeDeleteModal();
                }}>
                Confirm
              </button>
              <button onClick={closeDeleteModal}>Cancel</button>
            </div>
          </Modal>
        )}

        {showReset && (
          <Modal className="diffroll-confirm-modal" close={closeResetModal}>
            <h2>Reset Game</h2>

            <p>Be aware that all results and players will be removed!</p>

            <div className="buttons">
              <button onClick={reset}>Confirm</button>
              <button onClick={closeResetModal}>Cancel</button>
            </div>
          </Modal>
        )}
      </main>
    </React.Fragment>
  );
};

export default Diffroll;
