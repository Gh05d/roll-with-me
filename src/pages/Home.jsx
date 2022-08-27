import React from "react";
import { Link } from "react-router-dom";

import "../styles/Home.css";

const Home = () => {
  return (
    <main>
      <h1>Dice Games</h1>
      <p>Here are links to all available games:</p>

      <ul className="games">
        <li>
          <Link to="deathroll">💀 Deathroll</Link>
        </li>
        <li>
          <Link to="diffroll">🎲 Diffroll</Link>
        </li>
      </ul>
    </main>
  );
};

export default Home;
