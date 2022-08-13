import React from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  let location = useLocation();

  return (
    <main>
      <h1>{location?.pathname?.substring(1) || "Site"} not found</h1>
      <p>Sorry, nothing here</p>
    </main>
  );
};

export default NotFound;
