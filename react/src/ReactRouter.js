import React from "react";
import { Switch, Route } from "react-router";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Milestones from "./components/Milestones";
import Projects from "./components/Projects";
import Devlog from "./components/Devlog";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/milestones" component={Milestones} />
      <Route path="/devlog" component={Devlog} />
      <Route path="/projects" component={Projects} />
    </Switch>
  );
};

export default Router;
