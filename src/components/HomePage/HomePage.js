import React, { useState } from "react";
import Cookies from "universal-cookie";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";

const HomePage = (props) => {
  const cookies = new Cookies();

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
