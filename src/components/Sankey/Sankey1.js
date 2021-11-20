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
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    getTwilioTags("twilio").then((res1) => {
      let tempKeys = [];
      res1.data.items.forEach((item1, index1) => {
        if (tempKeys.indexOf(item1.name) < 0) {
          tempKeys.push(item1.name);
        }

        getRelatedTags(item1.name).then((res2) => {
          let tempTagRelationJson = [];
          res2.data.items.forEach((item2, index2) => {
            if (item1.name !== item2.name) {
              // tempTagRelationJson.push({
              //   tagName: item1.name,
              //   relatedName: item2.name,
              //   [item2.name]: item2.count,

              // });

              tempTagRelationJson.push(
                <Series
                  valueField={item2.name}
                  argumentField={item2.name}
                  name={item1.name}
                  type="bar"
                  key={`${item1.name}${item2.name}`}
                />
              );
            }
          });
          setTwilioTags((prevState) => [...prevState, ...tempTagRelationJson]);
        });
      });
      setKeys(tempKeys);
    });
  }, []);

  let poop = [];
  poop = [
    {
      country: "USA",
      hydro: 59.8,
      oil: 937.6,
      gas: 582,
      coal: 564.3,
      nuclear: 187.9,
    },
    {
      country: "China",
      hydro: 74.2,
      oil: 308.6,
      gas: 35.1,
      coal: 956.9,
      nuclear: 11.3,
    },
  ];
  // console.log(poop);
  console.log(twilioTags);
  // console.log(keys);

  async function getTwilioTags(tagName) {
    let queryUrl = "";

    queryUrl = `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${tagName}&pagesize=1&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
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

    queryUrl = `https://api.stackexchange.com/2.3/tags/${tagName}/related?pagesize=4&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
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
              {/* <CommonSeriesSettings argumentField="tagName" type="stackedBar" /> */}

              {/* {console.log(...twilioTags)}
              {console.log(...poop)}

              {keys.map((key, index) => {
                let seriesList = [];
                twilioTags.map((tKey, tIndex) => {
                  // console.log(tKey.key);
                  // console.log(`<<<<< ${key} >>>>>`);
                  if (key === tKey.tagName) {
                    // console.log(`Key: ${key}`);
                    // console.log(`Key<>tagNameKey: ${key}<>${tKey.tagName}`);
                    // console.log(`RelatedTag: ${twilioTags[0]}`);

                    let listKey = key.concat(tKey.relatedName);
                    seriesList.push(
                      <Series
                        valueField={twilioTags[index].relatedName}
                        name={tKey.relatedName}
                        key={listKey}
                      />
                    );
                    console.log(seriesList);
                    return [...seriesList];
                  }
                });
              })} */}

              {twilioTags}

              {/* <Series valueField="twilio-api" name="TWILIO-API" />
              <Series valueField="php" name="php" />
              <Series valueField="node.js" name="node.js" />
              <Series valueField="javascript" name="javascript" /> */}

              <Legend
                verticalAlignment="top"
                horizontalAlignment="center"
                itemTextPosition="right"
              />
              <Export enabled={true} />
              <Tooltip enabled={true} customizeTooltip="" />
            </Chart>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Sankey;
