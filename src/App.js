import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import React from "react";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route path="/:filter" component={HomePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
};

export default App;
