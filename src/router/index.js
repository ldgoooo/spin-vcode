import React from "react";
import Home from "../pages/home";
import Contact from "../pages/Contact";
import About from "../pages/About";
const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/contact": () => <Contact />
};
export default routes;