import React from "react";
import { generateID } from "./helpers";

const DiffrollResult = ({ players, maxNumber, minNumber }) => {
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
    { opacity: 0.4, offset: 0.9 },
    { opacity: 1 },
  ];

  const opacityAnimationConfig = {
    duration: 1200,
    fill: "forwards",
    easing: "ease-in-out",
  };

  const rollDice = () => Math.floor(Math.random() * maxNumber - minNumber);

  return (
    <div id="diffroll-game">
      {Object.values(players).map((player, i) => (
        <div key={generateID(player.name)} className="player-row">
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
            {rollDice()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DiffrollResult;
