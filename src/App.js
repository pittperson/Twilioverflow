import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import Charts from "./components/Charts/Charts";
import React from "react";

const App = () => {
  return (
    <main>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/charts" component={Charts} />
          <Route path="/:filter" component={HomePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </main>
  );
};

export default App;
