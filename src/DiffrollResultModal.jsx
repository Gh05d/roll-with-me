import React from "react";
import Modal from "./Modal";

import "./styles/DiffrollModal.css";

const DiffrollResultModal = ({ close, decision }) => {
  function computeAmount() {
    const euro = Math.floor(decision.amount / 60);
    const cent = decision.amount % 60;

    return `${decision.highest} - ${decision.lowest} = ${decision.amount} / 60 = ${euro},${cent}`;
  }

  return (
    <Modal close={close}>
      {decision ? (
        <div id="diffroll-result">
          <b>{decision.loser} 💩</b>
          <span> has to to pay </span>
          <b>{computeAmount()} €</b>
          <span> to </span>
          <b>{decision.winner} 👑</b>
        </div>
      ) : (
        <div>
          Berechne... <i className="fa fa-spinner fa-spin" />
        </div>
      )}
    </Modal>
  );
};

export default DiffrollResultModal;
