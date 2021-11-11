import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";

const HomePage = (props) => {
  const [twilioTags, setTwilioTags] = useState([]);

  let filter = "";
  if (props.match.params.filter !== undefined) {
    filter = props.match.params.filter;
  }

  useEffect(() => {
    collectTwilioTags("twilio");
  }, []);

  const collectTwilioTags = async (tagName) => {
    let queryUrl = "";

    queryUrl = `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${tagName}&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
    await axios
      .get(queryUrl)
      .then((res) => {
        let titles = [];
        const { items } = res.data;

        items.forEach((item) => {
          titles.push(item.name);
        });

        setTwilioTags([...titles]);
      })
      .catch((e) => {
        console.log("error: ", e.message);
      });
  };

  // console.log(twilioTags);

  return (
    <div>
      <Header twilioTags={twilioTags} />
      <Hero filter={filter} />
      <Footer />
    </div>
  );
};

export default HomePage;
