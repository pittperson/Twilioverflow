import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { getTwilioTags } from "../../helpers/getTwilioTags";
import Chart from "react-google-charts";

const Sankey = (props) => {
  const [tagRelationJson, setTagRelationJson] = useState([]);
  useEffect(() => {
    getRelatedTags("twilio").then((res) => {
      let tempTagRelationJson = [];
      tempTagRelationJson.push(["From", "To", "Weight"]);
      res.data.items.map((item, index) => {
        if (item.name !== "twilio") {
          tempTagRelationJson.push(["Twilio", `${item.name}`, item.count]);
        }
      });

      setTagRelationJson(tempTagRelationJson);
    });
  }, []);

  async function getRelatedTags(tagName) {
    let queryUrl = "";

    queryUrl = `https://api.stackexchange.com/2.3/tags/${tagName}/related?pagesize=100&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
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
