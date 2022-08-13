import React from "react";
import { Link } from "react-router-dom";

import "./styles/Header.css";

const Header = props => {
  return (
    <header>
      <Link to="/">🎲 DICE GAMES</Link>
    </header>
  );
};

export default Header;
