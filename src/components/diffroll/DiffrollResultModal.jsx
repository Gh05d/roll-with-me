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
  }, []);

  const onClose = () => close({ winner, loser });

  function render() {
    if (winner && loser) {
      return (
        <React.Fragment>
          <b>{loser.name} 💩</b>
          <span> has to pay </span>
          <b>
            {`${highest} - ${lowest} = ${amount}`} <i className="fa-solid fa-coins" />
          </b>
          <span> to </span>
          <b>{winner.name} 👑</b>

          <button onClick={onClose}>OK</button>
        </React.Fragment>
      );
    }

    if (!winner) {
      return <TieBreaker list={winners} forWin onClick={person => setWinner(person)} />;
    }

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
    <Modal noCloseOverlay noCloseClick close={onClose}>
      <div id="diffroll-result">{render()}</div>
    </Modal>
  );
};

export default DiffrollResultModal;
