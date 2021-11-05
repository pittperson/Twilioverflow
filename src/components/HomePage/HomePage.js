import React from "react";

import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";

const HomePage = (props) => {
  let filter = "";
  if (props.match.params.filter !== undefined) {
    filter = props.match.params.filter;
  }

  return (
    <div>
      <Header />
      <Hero filter={filter} />
      <Footer />
    </div>
  );
};

export default HomePage;
