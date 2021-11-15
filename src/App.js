import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import Sankey from "./components/Sankey/Sankey";
import React from "react";

const App = () => {
  return (
    <main>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/sankey" component={Sankey} />
          <Route path="/:filter" component={HomePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </main>
  );
};

export default App;
