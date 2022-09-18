import React from "react";
import { Helmet } from "react-helmet";
import generateName from "sillyname";

import Modal from "../components/Modal";
import { generateID } from "../helpers";

import "../styles/Deathroll.css";

const DEFAULT_VALUE = 100;

const Deathroll = () => {
  const [players, setPlayers] = React.useState([]);
  const [show, toggle] = React.useState(false);
  const [roll, setRoll] = React.useState(DEFAULT_VALUE);
  const [playerTurn, setPlayerTurn] = React.useState(0);

  React.useEffect(() => {
    setDefaultPlayers();
  }, []);

  function addPlayer() {
    setPlayers(state => [
      ...state,
      { name: generateName(), id: generateID(), rolls: [], inGame: true },
    ]);
  }

  function removePlayer(id) {
    setPlayers(state => state.filter(player => player.id != id));
  }

  function setDefaultPlayers() {
    setPlayers([
      { name: "Triggerhappy Dommez", id: generateID(), rolls: [], inGame: true },
      { name: "Your food sucks - Müller", id: generateID(), rolls: [], inGame: true },
    ]);
  }

  function handleClick() {
    const value = Math.floor(Math.random() * (roll - 1 + 1) + 1);
    setRoll(value);
    toggle(true);
  }

  function searchPlayer(state, index) {
    if (state[index].inGame) return state[index];

    return searchPlayer(state, index == state.length - 1 ? 0 : ++index);
  }

  async function handleRoll() {
    let currentIndex = playerTurn;

    await setPlayers(state => {
      const copiedState = [...state];
      const player = { ...searchPlayer(copiedState, playerTurn) };

      player.rolls.push(roll);
      player.inGame = roll > 1;

      const index = copiedState.findIndex(item => item.id == player.id);
      currentIndex = index;
      copiedState[index] = player;

      return copiedState;
    });

    setPlayerTurn(currentIndex + 1 >= players.length ? 0 : currentIndex + 1);

    if (roll == 1) {
      const end = checkDisabled();

      if (!end) {
        const newRoll = players.reduce((acc, cV) => {
          if (cV.inGame && cV.rolls[cV.rolls.length - 1] > acc) {
            acc = cV.rolls[cV.rolls.length - 1];
          }

          return acc;
        }, 1);

        setRoll(newRoll);
      }
    }

    toggle(false);
  }

  function handleChange(e) {
    const newValue = e.target.value;
    setRoll(newValue);
  }

  function reset() {
    setRoll(DEFAULT_VALUE);
    setPlayerTurn(0);
    setPlayers(state => {
      const copy = [...state];
      const resettedState = copy.map(item => ({ ...item, rolls: [], inGame: true }));

      return resettedState;
    });
  }

  function handleInput(e) {
    const id = e.target.name;
    const value = e.target.value;

    setPlayers(state => {
      const copy = [...state];
      const index = state.findIndex(player => player.id == id);
      copy[index].name = value;

      return copy;
    });
  }

  function checkDisabled() {
    let inGame = 0;

    for (const player of players) {
      if (player.inGame) inGame++;
    }

    return inGame < 2;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title itemProp="name" lang="en">
          Players roll until one is left
        </title>

        <meta
          name="description"
          content="Deathroll is a game played by at least two players. You select a starting number and all players roll alternately. Who rolls a 1 is out of the game."
        />
      </Helmet>

      <main id="deathroll">
        <h1>
          Deathroll{" "}
          <span aria-label="skull and dice" role="img">
            💀🎲
          </span>
        </h1>

        <ul className="deathroll-players">
          {players.map(player => (
            <li className="player-data" key={player.id}>
              <input
                title="Player name"
                name={player.id}
                aria-label="Player name"
                disabled={checkDisabled()}
                value={player.name}
                onChange={handleInput}
              />

              <div>
                <span>Rolls: </span>
                {player.rolls.map((value, i) => (
                  <React.Fragment key={`${value}-${i}`}>
                    <span>{value}</span>
                    {value == 1 && <span className="loser">💀</span>}
                  </React.Fragment>
                ))}
              </div>

              {players.length > 2 && !players[0].rolls.length && (
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

          {players.length && !players[0].rolls.length && (
            <li>
              <button
                title="Add player"
                onClick={addPlayer}
                aria-label="Add player"
                className="add-player">
                <i className="fa fa-user-plus" /> Add player
              </button>
            </li>
          )}
        </ul>

        <h2>Rolls</h2>
        <input
          disabled={players[0]?.rolls.length}
          onChange={handleChange}
          value={roll}
          step={10}
          type="number"
        />

        <button disabled={checkDisabled()} onClick={handleClick}>
          Roll
        </button>

        <button onClick={reset}>Reset</button>

        {show && (
          <Modal show={show} close={handleRoll}>
            <div className={`result ${roll == 1 && "skull"}`}>
              <span>{`${players[playerTurn]?.name} rolled`}</span>
              <span>{roll}</span>
            </div>
          </Modal>
        )}
      </main>
    </React.Fragment>
  );
};

export default Deathroll;
