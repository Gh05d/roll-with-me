import React from "react";
import { generateID } from "../../helpers";

const DiffrollResult = ({ players, results, animationDuration }) => {
  let highestRoll;
  let lowestRoll;

  for (const result of Object.values(results)) {
    if (!highestRoll || result[result.length - 1] > highestRoll) {
      highestRoll = result[result.length - 1];
    }

    if (!lowestRoll || result[result.length - 1] < lowestRoll) {
      lowestRoll = result[result.length - 1];
    }
  }

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
            results[player.id][results[player.id].length - 1] == highestRoll
              ? el?.animate(createAnimation("gold"), {
                  ...opacityAnimationConfig,
                  delay: Object.values(players).length * animationDuration * 2,
                })
              : results[player.id][results[player.id].length - 1] == lowestRoll
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
            {results[player.id][results[player.id].length - 1]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default React.memo(DiffrollResult);
