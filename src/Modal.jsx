import React from "react";
import "./styles/Modal.css";

const Modal = props => (
  <React.Fragment>
    <div id="overlay" role="button" onClick={props.close} />
    <div id="modal" role="button" onClick={props.close}>
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;
