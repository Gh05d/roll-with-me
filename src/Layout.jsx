import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

const Layout = () => {
  return (
    <React.Fragment>
      <Helmet
        defaultTitle="Online automatic dice roller games | ROLL WITH ME"
        titleTemplate="%s | ROLL WITH ME">
        <meta
          name="description"
          content="Different dice based games like Deathroll you can play one on one or in groups. Every game is optimized to be as easily transparently played as possible."
        />
      </Helmet>

      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
