import React from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import AboutMe from "../Pages/AboutMe";
import ContactMe from "../Pages/ContactMe";

import Home from "../Pages/Home";

const Navigation = () => {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/AboutMe" element={<AboutMe />} />
        <Route exact path="/ContactMe" element={<ContactMe />} />
        
      </Routes>
    </HashRouter>
  );
};

export default Navigation;
