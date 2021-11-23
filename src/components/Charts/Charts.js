import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Dropdown } from "react-bootstrap";

const getLastItem = (thePath) =>
  thePath.substring(thePath.lastIndexOf("/") + 1);

const Charts = () => {
  const [categories, setCategories] = useState([]);
  const [dataArray, setDataArray] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getTwilioTags("twilio").then((res1) => {
      let tempKeys = [];

      for (let i = 0; i < res1.data.items.length; i++) {
        let tempData = [];
        let category = res1.data.items[i];
        let catIndex = i;

        if (tempKeys.indexOf(category.name) < 0) {
          tempKeys.push(category.name);

          categories.push(
            <Dropdown.Item
              href={window.location.origin + "/charts/" + category.name}
              key={i}
            >
              {category.name}
            </Dropdown.Item>
          );
        }
      }
    });

    let lastPathItem = getLastItem(window.location.pathname);
    let categoryName = lastPathItem;

    if (lastPathItem !== "charts") {
      let tempRelatedTags = [];
      let tempData = [];
      let tempDatasets = [];

      console.log("categoryName: ", categoryName);
      getRelatedTags(categoryName).then((relatedTags) => {
        // console.log("related tags: ", relatedTags);
        for (
          let RtIndex = 0;
          RtIndex < relatedTags.data.items.length;
          RtIndex++
        ) {
          if (!tempRelatedTags.includes(relatedTags.data.items[RtIndex].name)) {
            tempRelatedTags.push(relatedTags.data.items[RtIndex].name);
            tempData.push(relatedTags.data.items[RtIndex].count);
          }
        }

        console.log(tempData);

        for (let x = 0; x < tempRelatedTags.length; x++) {
          tempDatasets.push({
            label: tempRelatedTags[x],
            data: tempData[x],
          });
        }

        // console.log(tempDatasets);

        // dataset = [{
        //   label:
        //   data:
        // }]
        // tempDatasets.push({
        //   // label: relatedTags.data.items[RtIndex].name,
        //   data: tempData,
        //   backgroundColor: "rgb(254,171,5)",
        //   barPercentage: 0.5,
        //   barThickness: 6,
        //   maxBarThickness: 8,
        //   minBarLength: 2,
        // });

        // console.log(tempRelatedTags);
        // console.log(tempData);

        setDataArray({
          labels: tempRelatedTags,
          datasets: tempDatasets,
        });
      });
    } else {
      console.log("choose a dropdown");
    }
  }, []);

  console.log(dataArray);

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
    },
    elements: {
      bar: {
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        borderColor: "#fff",
      },
    },
    scales: {
      y: {},
      x: {},
    },
  };

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
    queryUrl = `https://api.stackexchange.com/2.3/tags/${tagName}/related?pagesize=10&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;

    console.log("related tags query: ", queryUrl);

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
            <br />
            <Dropdown className="mb-4">
              <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                Twilio Categories
              </Dropdown.Toggle>

              <Dropdown.Menu>{categories}</Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          <Col>
            <Bar data={dataArray} options={options} redraw />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Charts;
