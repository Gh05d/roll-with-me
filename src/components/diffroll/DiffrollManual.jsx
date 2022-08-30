import React from "react";
import { getResults } from "../../helpers";

const DiffrollManual = ({ players, finish, results }) => {
  const [value, setValue] = React.useState(null);

  const playersArray = Object.values(players);
  const { highestRoll, lowestRoll } = getResults(results);

  return (
    <ul className="diffroll-game" id="diffroll-game-manual">
      {playersArray.map((player, i) => {
        const playerRoll = results[player.id][results[player.id].length - 1];

        return (
          <li
            className={`player-row ${
              value == playersArray.length - 1
                ? playerRoll == highestRoll
                  ? "highlight-winner"
                  : playerRoll == lowestRoll
                  ? "highlight-loser"
                  : ""
                : ""
            }`}
            key={player.id}>
            <span>{player.name}</span>
            {value !== null && value >= i && (
              <React.Fragment>
                <i className="fa fa-dice-d20 show-roll" />
                <span className="show-roll-result">{playerRoll}</span>
              </React.Fragment>
            )}
          </li>
        );
      })}

      {value == playersArray.length - 1 ? (
        <button onClick={finish}>Finish</button>
      ) : (
        <button onClick={() => setValue(state => (state === null ? 0 : state + 1))}>
          Roll
        </button>
      )}
    </ul>
  );
};

export default React.memo(DiffrollManual);
