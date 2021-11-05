import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import React, { Component } from "react";

const App = () => {
  return (
    // <div className="App">
    <main>
      <Switch>
        <Route path="/:filter" component={HomePage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </main>
    // </div>
  );
};

export default App;
