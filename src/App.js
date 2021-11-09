import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import React from "react";

const App = () => {
  return (
    // <div className="App">
    <main>
      <BrowserRouter>
        <Switch>
          <Route path="/:filter" component={HomePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </main>
    // </div>
  );
};

export default App;
