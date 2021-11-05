import Post from "../Post/Post";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { decode } from "html-entities";

const axios = require("axios");

const Hero = (props) => {
  const [titleList, setTitleList] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [titleLimit, setTitleLimit] = useState(50);
  const [filters, setFilters] = useState("twilio;" + props?.filter ?? "");

  useEffect(() => {
    console.log("Initial Load: " + filters);

    getTitles(nextPage, titleLimit, filters);
    return () => {
      console.log("Initial Load Done");
    };
  }, [titleLimit]);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.scrollY;

      if (document.body.clientHeight === currentPosition + window.innerHeight) {
        // console.log("On Scroll: " + filters);
        getTitles(nextPage, titleLimit, filters);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [nextPage]);

  const getTitles = (pageNum, pageSize) => {
    axios
      .get(
        `https://api.stackexchange.com/2.3/questions?tagged=[${filters}]&page=${pageNum}&pagesize=${pageSize}&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`
      )
      .then((res) => {
        // console.log(res);

        const titles = [];
        const { items } = res.data;

        // console.log(items);

        items.forEach((item) => {
          // console.log(item.tags);
          titles.push(
            <Post
              key={item.question_id}
              title={item.title}
              tags={item.tags}
              date={item.creation_date}
              link={item.link}
              answered={item.is_answered}
              filters={filters}
            />
          );
        });

        // console.log(titles);

        setTitleList([...titleList, ...titles]); // Brad

        setNextPage(pageNum + 1);
      })
      .catch((e) => {
        // console.log("error: ", e.message);
      });
  };

  return (
    <>
      <br></br>
      <Container fluid>{titleList}</Container>
    </>
  );
};

export default Hero;
