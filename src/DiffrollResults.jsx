import React from "react";
import { generateID } from "./helpers";

const DiffrollResult = ({ players, maxNumber, minNumber, renderResult }) => {
  const [results, setResults] = React.useState({});
  const [highest, setHighest] = React.useState(0);
  const [lowest, setLowest] = React.useState(0);
  const animationDuration = 600;

  React.useEffect(() => {
    function rollDice() {
      return Math.floor(Math.random() * (+maxNumber - +minNumber + 1)) + +minNumber;
    }

    const playersArray = Object.values(players);

    let highestRoll = minNumber;
    let lowestRoll = maxNumber;

    const rolls = playersArray.reduce((acc, cV) => {
      const roll = rollDice();
      acc[cV.id] = roll;

      if (roll > highestRoll) highestRoll = roll;
      if (roll < lowestRoll) lowestRoll = roll;

      return acc;
    }, {});

    setResults(rolls);
    setHighest(highestRoll);
    setLowest(lowestRoll);

    setTimeout(() => {
      const winners = [];
      const losers = [];

      for (const player of playersArray) {
        if (rolls[player.id] == highestRoll) winners.push(player);
        if (rolls[player.id] == lowestRoll) losers.push(player);
      }

      renderResult({ winners, losers, highest: highestRoll, lowest: lowestRoll });
    }, playersArray.length * animationDuration * 2 + animationDuration);
  }, []);

  const rollAnimation = [
    {
      transform: "perspective(none) rotate(0deg) translateZ(10rem)",
    },
    {
      transform: "perspective(40rem) rotate(240deg) translateZ(5rem)",
      offset: 0.5,
    },
    {
      transform: "perspective(none) rotate(360deg) translateZ(3rem)",
      offset: 0.75,
    },
    {
      transform: "perspective(none) rotate(330deg) translateZ(7rem)",
    },
  ];

  const animationConfig = {
    duration: animationDuration,
    iterations: 2,
    easing: "ease-in-out",
    fill: "forwards",
  };

  const opacityAnimation = [
    { opacity: 0 },
    { opacity: 0.1, offset: 0.9 },
    { opacity: 1 },
  ];

  const opacityAnimationConfig = {
    duration: animationDuration * 2,
    fill: "forwards",
    easing: "ease-in-out",
  };

  function createAnimation(color) {
    return [
      { backgroundColor: "white" },
      { backgroundColor: color, padding: "0.5rem 0" },
    ];
  }

  return (
    <div id="diffroll-game">
      {Object.values(players).map((player, i) => (
        <div
          key={generateID(player.name)}
          ref={el =>
            results[player.id] == highest
              ? el?.animate(createAnimation("gold"), {
                  ...opacityAnimationConfig,
                  delay: Object.values(players).length * animationDuration * 2,
                })
              : results[player.id] == lowest
              ? el?.animate(createAnimation("brown"), {
                  ...opacityAnimationConfig,
                  delay: Object.values(players).length * animationDuration * 2,
                })
              : null
          }
          className="player-row">
          <span>{player.name}</span>

          <i
            className="fa fa-dice-d20"
            ref={el =>
              el?.animate(rollAnimation, {
                ...animationConfig,
                delay: i * 2 * animationDuration,
              })
            }
          />

          <span
            className="dice-result"
            ref={el =>
              el?.animate(opacityAnimation, {
                ...opacityAnimationConfig,
                delay: i * animationDuration * 2,
              })
            }>
            {results[player.id]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default React.memo(DiffrollResult);
