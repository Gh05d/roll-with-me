import React from "react";
import { Link } from "react-router-dom";

import "./styles/Header.css";

const Header = () => (
  <header>
    <div id="logo" />
    <Link to="/roll-with-me/">DICE GAMES</Link>
  </header>
);

export default Header;
