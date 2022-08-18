import React from "react";
import { Helmet } from "react-helmet";
import generateName from "sillyname";
import DiffrollResultModal from "./DiffrollResultModal";

import DiffrollResult from "./DiffrollResults";

import { generateID } from "./helpers";

import "./styles/Diffroll.css";

const Diffroll = () => {
  const [players, setPlayers] = React.useState({});
  const [minNumber, setMinNumber] = React.useState(10);
  const [maxNumber, setMaxNumber] = React.useState(1000);
  const [started, toggle] = React.useState(false);
  const [show, setModal] = React.useState(false);
  const [decision, setDecision] = React.useState(null);

  React.useState(() => {
    setPlayers(() => {
      const id1 = generateID();
      const id2 = generateID();

      return {
        [id1]: { name: "Dommi Doppelkinn", id: id1 },
        [id2]: { name: "Weasel Müller", id: id2 },
      };
    });
  }, []);

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

  function renderResult({ winners, losers, highest, lowest }) {
    setModal(true);
    setDecision({
      winner: winners[0].name,
      loser: losers[0].name,
      amount: highest - lowest,
      highest,
      lowest,
    });
  }

  const showResult = React.useCallback(({ winners, losers, highest, lowest }) => {
    renderResult({ winners, losers, highest, lowest });
  }, []);

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
            maxNumber={maxNumber}
            minNumber={minNumber}
            players={currentPlayers()}
            renderResult={showResult}
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
                step={10}
                type="number"
                min={10}
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
          </div>
        )}

        <button onClick={() => toggle(state => !state)} className="start-button">
          {started ? "Restart Game" : "Start Game"}
        </button>

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
