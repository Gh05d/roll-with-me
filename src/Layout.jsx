import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

import Footer from "./components/Footer";
import Header from "./components/Header";

import "./styles/App.css";

const Layout = () => (
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

export default Layout;
