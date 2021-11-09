import Post from "../Post/Post";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Container from "react-bootstrap/Container";

const axios = require("axios");

const Hero = (props) => {
  const cookies = new Cookies();

  const [titleList, setTitleList] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [titleLimit, setTitleLimit] = useState(100);
  const [filters, setFilters] = useState("twilio;" + props?.filter ?? "");
  const [searchFor, setSearchFor] = useState(cookies.get("search"));
  const [hasMore, setHasMore] = useState("false");

  useEffect(() => {
    getTitles(nextPage, titleLimit, filters);

    return () => {};
  }, []);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.scrollY;

      if (
        document.body.clientHeight ===
        currentPosition + window.innerHeight - 10
      ) {
        getTitles(nextPage, titleLimit, filters);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [nextPage]);

  const getTitles = (pageNum, pageSize, nextPage) => {
    let queryUrl = "";

    if (searchFor) {
      searchFor.replace(/[+#]/gi, "\\$&");
      queryUrl = `https://api.stackexchange.com/2.3/search?tagged=[${filters}]&intitle=${searchFor}&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
    } else {
      queryUrl = `https://api.stackexchange.com/2.3/questions?tagged=[${filters}]&page=${pageNum}&pagesize=${pageSize}&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
    }

    axios
      .get(queryUrl)
      .then((res) => {
        let hasMore = "";
        const titles = [];
        const { items } = res.data;

        hasMore = res.data.has_more;

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

        setTitleList([...titleList, ...titles]);

        if (hasMore.toString() === "true") {
          setNextPage(pageNum + 1);
        }
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
