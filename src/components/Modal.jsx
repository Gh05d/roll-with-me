import React from "react";
import "../styles/Modal.css";

const Modal = props => (
  <React.Fragment>
    <div id="overlay" role="button" onClick={props.noCloseOverlay ? null : props.close} />
    <div id="modal" role="button" onClick={props.noCloseClick ? null : props.close}>
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;
