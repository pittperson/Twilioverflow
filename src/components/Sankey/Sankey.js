import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { getTwilioTags } from "../../helpers/getTwilioTags";
import Chart from "react-google-charts";
import ApexCharts from "apexcharts";

const Sankey = (props) => {
  const [tagRelationJson, setTagRelationJson] = useState([
    ["From", "To", "Weight"],
  ]);
  const [twilioTags, setTwilioTags] = useState({});

  useEffect(() => {
    setTwilioTags({
      series: [
        { name: "a", data: [40] },
        { name: "b", data: [30] },
      ],
    });

    console.log(`ddd: ${JSON.stringify(twilioTags)}`);

    // setTwilioTags({ series: { ...twilioTags.series } });

    // console.log(twilioTags);
    // let poo = [];
    // poo = {
    //   series: [
    //     { name: "a.poo", data: [40] },
    //     { name: "b.poo", data: [30] },
    //   ],
    // };

    // setTwilioTags({
    //   ...twilioTags,
    //   ...poo,
    // });

    // console.log({ ...twilioTags });

    // console.log(...poo);

    // setTwilioTags({
    //   ...twilioTags,
    //   ...twilioTags.series: series: {
    //     name: "c",
    //     data: [20],
    //   },
    // });
    // item = "item1";
    // setTwilioTags((prevState) => ({ ...prevState, item: "value1" }));
    // console.log(tagRelationJson);
    // getTwilioTags("twilio").then((res1) => {
    //   // console.log(res1.data.items);
    //   res1.data.items.forEach((item1) => {
    //     getRelatedTags(item1.name).then((res2) => {
    //       // console.log(`Item 1 Name: ${item1.name}`);
    //       // console.log(res2.data.items);
    //       let tempTagRelationJson = [];
    //       res2.data.items.forEach((item2) => {
    //         if (item1.name !== item2.name) {
    //           // console.log(`${item1.name}, ${item2.name}, ${item2.count}`);
    //           // tempTagRelationJson.push([item1.name, item2.name, item2.count]);
    //           setTwilioTags((prevState) => ({
    //             ...prevState,
    //             series: [{ name: item1.name, data: [item2.count] }],
    //           }));
    //         }
    //       });
    //       // setTagRelationJson((oldArray) => [
    //       //   ...oldArray,
    //       //   ...tempTagRelationJson,
    //       // ]);
    //     });
    //   });
    // });
  }, []);

  // console.log(twilioTags);

  // console.log(tagRelationJson);
  // console.log(JSON.stringify(tagRelationJson));

  async function getTwilioTags(tagName) {
    let queryUrl = "";

    queryUrl = `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${tagName}&pagesize=2&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
    return axios
      .get(queryUrl)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log("error: ", e.message);
      });
  }

  async function getRelatedTags(tagName) {
    let queryUrl = "";

    queryUrl = `https://api.stackexchange.com/2.3/tags/${tagName}/related?pagesize=20&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
    return axios
      .get(queryUrl)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log("error: ", e.message);
      });
  }

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};
export default Sankey;
