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

  useEffect(() => {
    // getTitles(nextPage, titleLimit, filters);

    return () => {};
  }, []);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.scrollY;

      if (
        document.body.clientHeight ===
        currentPosition + window.innerHeight - 10
      ) {
        // getTitles(nextPage, titleLimit, filters);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [nextPage]);

  // const getTitles = (pageNum, pageSize, nextPage) => {
  //   axios
  //     .get(
  //       `https://api.stackexchange.com/2.3/questions?tagged=[${filters}]&page=${pageNum}&pagesize=${pageSize}&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`
  //     )
  //     .then((res) => {
  //       const titles = [];
  //       const { items } = res.data;

  //       let searchFor = cookies.get("search");
  //       searchFor
  //         ? console.log("Res Cookie: '" + searchFor + "'")
  //         : (searchFor = "");

  //       searchFor.replace(/[+#]/g, "\\$&");

  //       if (searchFor) {
  //         items.forEach((item) => {
  //           if (item.title.match(searchFor)) {
  //             titles.push(
  //               <Post
  //                 key={item.question_id}
  //                 title={item.title}
  //                 tags={item.tags}
  //                 date={item.creation_date}
  //                 link={item.link}
  //                 answered={item.is_answered}
  //                 filters={filters}
  //               />
  //             );
  //           }
  //         });
  //         console.log(titles.length);
  //       } else {
  //         items.forEach((item) => {
  //           titles.push(
  //             <Post
  //               key={item.question_id}
  //               title={item.title}
  //               tags={item.tags}
  //               date={item.creation_date}
  //               link={item.link}
  //               answered={item.is_answered}
  //               filters={filters}
  //             />
  //           );
  //         });
  //       }

  //       setTitleList([...titleList, ...titles]); // Brad
  //       setNextPage(pageNum + 1);
  //     })
  //     .catch((e) => {
  //       console.log("error: ", e.message);
  //     });
  // };

  // ------------------

  // const getTitles = async (pageNum, pageSize, nextPage) => {
  //   axios
  //     .get(
  //       `https://api.stackexchange.com/2.3/questions?tagged=[${filters}]&page=${pageNum}&pagesize=${pageSize}&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`
  //     )
  //     .then((res) => {
  //       const titles = [];
  //       const { items } = res.data;

  //       // let searchFor = cookies.get("search");
  //       // searchFor
  //       //   ? console.log("Res Cookie: '" + searchFor + "'")
  //       //   : (searchFor = "");

  //       searchFor.replace(/[+#]/g, "\\$&");

  //       if (searchFor) {
  //         console.log("RegEx");
  //         items.forEach((item) => {
  //           if (item.title.match(searchFor)) {
  //             titles.push(
  //               <Post
  //                 key={item.question_id}
  //                 title={item.title}
  //                 tags={item.tags}
  //                 date={item.creation_date}
  //                 link={item.link}
  //                 answered={item.is_answered}
  //                 filters={filters}
  //               />
  //             );
  //           }
  //         });
  //         console.log(titles.length);
  //       } else {
  //         console.log("No RegEx");
  //         items.forEach((item) => {
  //           titles.push(
  //             <Post
  //               key={item.question_id}
  //               title={item.title}
  //               tags={item.tags}
  //               date={item.creation_date}
  //               link={item.link}
  //               answered={item.is_answered}
  //               filters={filters}
  //             />
  //           );
  //         });
  //       }

  //       setTitleList([...titleList, ...titles]); // Brad
  //       setNextPage(pageNum + 1);
  //     })
  //     .catch((e) => {
  //       // console.log("error: ", e.message);
  //     });

  //   return titleList;
  // };

  const poo = async (page, articles) => {
    let newArr = [];

    for (let p = 1; p <= page; p++) {
      for (let a = 1; a <= articles; a++) {
        let page = p;
        let article = a;
        newArr.push(`Page: ${page}, Article: ${article}`);
      }
    }

    return newArr;
  };

  const collectAllSearchResults = async () => {
    // for (let page = 1; page <= 10; page++) {
    let result = await poo(10, 100);

    console.log(result);
    // }
  };

  collectAllSearchResults();

  return (
    <>
      <br></br>
      <Container fluid>{titleList}</Container>
    </>
  );
};

export default Hero;
