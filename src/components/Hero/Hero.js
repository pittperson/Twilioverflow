import Post from "../Post/Post";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

const axios = require("axios");

const Hero = (props) => {
  console.log(props);
  const [titleList, setTitleList] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [titleLimit, setTitleLimit] = useState(50);
  const [filters, setFilters] = useState("twilio;" + props?.filter ?? "");
  const [search, setSearch] = useState(props.searchFor);

  useEffect(() => {
    getTitles(nextPage, titleLimit, filters, search);

    return () => {};
  }, [search]);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.scrollY;

      if (
        document.body.clientHeight ===
        currentPosition + window.innerHeight - 10
      ) {
        setSearch(props.searchFor);
        getTitles(nextPage, titleLimit, filters, search);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [nextPage, search]);

  const getTitles = (pageNum, pageSize, nextPage, search) => {
    console.log(`res: ${search}`);

    axios
      .get(
        `https://api.stackexchange.com/2.3/questions?tagged=[${filters}]&page=${pageNum}&pagesize=${pageSize}&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`
      )
      .then((res) => {
        const titles = [];
        const { items } = res.data;

        items.forEach((item) => {
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
        setTitleList([...titleList, ...titles]); // Brad

        setNextPage(pageNum + 1);
      })
      .catch((e) => {
        console.log("error: ", e.message);
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
