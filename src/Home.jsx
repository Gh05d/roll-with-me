import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <h1>Dice Games</h1>
      <p>Here are links to all available games:</p>
      <Link to="deathroll">💀 Death Roll</Link>
    </main>
  );
};

export default Home;
