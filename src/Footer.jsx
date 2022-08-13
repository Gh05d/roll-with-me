import React from "react";

import "./styles/Footer.css";

const Footer = () => {
  const socialIcons = [
    { link: "https://github.com/Gh05d", symbol: "github" },
    { link: "https://www.freecodecamp.org/gh05d", symbol: "free-code-camp" },
    {
      link: "https://www.linkedin.com/in/pascal-clanget-545956ba/",
      symbol: "linkedin",
    },
    {
      link: "https://stackoverflow.com/users/7490871/gh05d",
      symbol: "stack-overflow",
    },
    { link: "https://www.instagram.com/gh05d/?hl=de", symbol: "instagram" },
  ];

  return (
    <footer>
      <div>
        <span>Created by </span>
        <a className="fancy-link" href="https://github.com/Gh05d">
          Gh05d
        </a>
      </div>

      <ul>
        {socialIcons.map(({ link, symbol }) => (
          <li key={link}>
            <a
              aria-label={symbol}
              rel="noreferrer"
              target="_blank"
              href={link}
              key={symbol}>
              <i className={`fab fa-${symbol}`} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
