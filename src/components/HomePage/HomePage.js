import React, { useState } from "react";

import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";

const HomePage = (props) => {
  const [searchFor, setSearchFor] = useState("");

  const searchCallback = (childData) => {
    setSearchFor(childData);
  };

  let filter = "";
  if (props.match.params.filter !== undefined) {
    filter = props.match.params.filter;
  }

  return (
    <div>
      <Header searchCallback={searchCallback} />
      <Hero filter={filter} searchFor={searchFor} />
      <Footer />
    </div>
  );
};

export default HomePage;
