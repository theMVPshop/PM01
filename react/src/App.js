import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { withRouter } from "react-router";

function App() {

  const NavWithRouter = withRouter(Navigation);

  return (
    <>
      <NavWithRouter />
      <ReactRouter />
    </>
  );
}

export default App;
