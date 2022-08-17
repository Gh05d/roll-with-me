import React from "react";
import { generateID } from "./helpers";

const DiffrollResult = ({ players, maxNumber, minNumber }) => {
  const [results, setResults] = React.useState({});
  const [highest, setHighest] = React.useState(0);
  const [lowest, setLowest] = React.useState(0);

  React.useEffect(() => {
    function rollDice() {
      return Math.floor(Math.random() * (+maxNumber - +minNumber + 1)) + +minNumber;
    }

    let highestRoll = minNumber;
    let lowestRoll = maxNumber;

    const rolls = Object.values(players).reduce((acc, cV) => {
      const roll = rollDice();
      acc[cV.id] = roll;

      if (roll > highestRoll) highestRoll = roll;
      if (roll < lowestRoll) lowestRoll = roll;

      return acc;
    }, {});

    setResults(rolls);
    setHighest(highestRoll);
    setLowest(lowestRoll);
  }, [players, maxNumber, minNumber]);

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
    duration: 600,
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
    duration: 1200,
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
                  delay: Object.values(players).length * 1200,
                })
              : results[player.id] == lowest
              ? el?.animate(createAnimation("brown"), {
                  ...opacityAnimationConfig,
                  delay: Object.values(players).length * 1200,
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
                delay: i * 2 * 600,
              })
            }
          />

          <span
            className="dice-result"
            ref={el =>
              el?.animate(opacityAnimation, {
                ...opacityAnimationConfig,
                delay: i * 1200,
              })
            }>
            {results[player.id]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DiffrollResult;
