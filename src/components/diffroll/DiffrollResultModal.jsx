import React from "react";
import Modal from "../Modal";

import "../../styles/DiffrollModal.css";
import TieBreaker from "./TieBreaker";

const DiffrollResultModal = ({ close, winners, losers, amount, highest, lowest }) => {
  const [winner, setWinner] = React.useState(null);
  const [loser, setLoser] = React.useState(null);

  React.useEffect(() => {
    if (winners.length == 1) setWinner(winners[0]);
    if (losers.length == 1) setLoser(losers[0]);
    console.log("FIRE ONCE");
  }, []);

  function computeAmount() {
    const euro = Math.floor(amount / 100);
    const cent = amount % 100;

    return `${highest} - ${lowest} = ${amount} / 100 = ${euro},${cent}`;
  }

  function render() {
    if (winner && loser) {
      return (
        <React.Fragment>
          <b>{loser.name} 💩</b>
          <span> has to pay </span>
          <b>{computeAmount()} 💶</b>
          <span> to </span>
          <b>{winner.name} 👑</b>

          <button onClick={close}>OK</button>
        </React.Fragment>
      );
    }

    console.log({ winner });
    if (!winner) {
      return <TieBreaker list={winners} forWin onClick={person => setWinner(person)} />;
    }

    console.log({ loser });

    if (!loser) {
      return (
        <TieBreaker list={losers} forWin={false} onClick={person => setLoser(person)} />
      );
    }

    return (
      <div>
        Berechne... <i className="fa fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <Modal noCloseOverlay noCloseClick close={close}>
      <div id="diffroll-result">{render()}</div>
    </Modal>
  );
};

export default DiffrollResultModal;
