import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { getTwilioTags } from "../../helpers/getTwilioTags";
import Chart from "react-google-charts";

const Sankey = (props) => {
  const [tagRelationJson, setTagRelationJson] = useState([
    ["From", "To", "Weight"],
  ]);
  const [twilioTags, setTwilioTags] = useState([]);

  useEffect(() => {
    // console.log(tagRelationJson);

    getTwilioTags("twilio").then((res1) => {
      res1.data.items.forEach((item1) => {
        getRelatedTags(item1.name).then((res2) => {
          // console.log(`Item 1 Name: ${item1.name}`);
          // console.log(res2.data.items);
          let tempTagRelationJson = [...tagRelationJson];
          res2.data.items.forEach((item2) => {
            // console.log(`${item1.name}, ${item2.name}, ${item2.count}`);
            tempTagRelationJson.push([item1.name, item2.name, item2.count]);
          });

          setTagRelationJson([...tagRelationJson, tempTagRelationJson]);
        });
      });
    });
  }, []);

  console.log(tagRelationJson);

  async function getTwilioTags(tagName) {
    let queryUrl = "";

    queryUrl = `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${tagName}&pagesize=100&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
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
          <Col>
            <div>sankey chard</div>
            <Chart
              width={1170}
              height={"1024px"}
              chartType="Sankey"
              loader={<div>Loading Chart</div>}
              options={{
                sankey: {
                  node: {
                    nodePadding: 10,
                    colors: ["#f22f46"],
                  },
                },
              }}
              data={tagRelationJson}
              rootProps={{ "data-tested": 1 }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Sankey;
