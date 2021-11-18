import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  Export,
  Tooltip,
  Title,
} from "devextreme-react/chart";

const Sankey = () => {
  // const [twilioTags, setTwilioTags] = useState({});
  const [twilioTags, setTwilioTags] = useState([]);
  const [str1, setStr1] = useState("");
  const [str2, setStr2] = useState("");

  useEffect(() => {
    getTwilioTags("twilio").then((res1) => {
      // console.log(
      //   res1.data.items.forEach((item1) => {
      //     console.log(item1);
      //   })
      // );
      res1.data.items.forEach((item1) => {
        getRelatedTags(item1.name).then((res2) => {
          // console.log(`>>>>>>>>Item 1 Name: ${item1.name}`);
          let tempTagRelationJson = [];
          res2.data.items.forEach((item2) => {
            if (item1.name !== item2.name) {
              tempTagRelationJson.push({
                key: item1.name,
                name: item2.name,
                data: item2.count,
              });
            }
          });
          setTwilioTags((prevState) => [...prevState, ...tempTagRelationJson]);
        });
      });
    });
  }, []);

  // let poop = [];
  // poop = [
  //   {
  //     country: "USA",
  //     hydro: 59.8,
  //     oil: 937.6,
  //     gas: 582,
  //     coal: 564.3,
  //     nuclear: 187.9,
  //   },
  //   {
  //     country: "China",
  //     hydro: 74.2,
  //     oil: 308.6,
  //     gas: 35.1,
  //     coal: 956.9,
  //     nuclear: 11.3,
  //   },
  // ];
  // console.log(poop);
  console.log(twilioTags);

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

    queryUrl = `https://api.stackexchange.com/2.3/tags/${tagName}/related?pagesize=5&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
    return axios
      .get(queryUrl)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log("error: ", e.message);
      });
  }

  function customizeTooltip(arg) {
    return {
      text: `${arg.percentText} years: ${arg.valueText}`,
    };
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Chart id="chart" dataSource={twilioTags}>
              <Title
                text="Energy Consumption in 2004"
                subtitle="(Millions of Tons, Oil Equivalent)"
              />
              <CommonSeriesSettings
                argumentField="country"
                type="fullstackedbar"
              />
              <Series valueField="hydro" name="Hydro-electric" />
              <Series valueField="oil" name="Oil" />
              <Series valueField="gas" name="Natural gas" />
              <Series valueField="coal" name="Coal" />
              <Series valueField="nuclear" name="Nuclear" />

              <Legend
                verticalAlignment="top"
                horizontalAlignment="center"
                itemTextPosition="right"
              />
              <Export enabled={true} />
              <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
            </Chart>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Sankey;
