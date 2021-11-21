import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Sankey = () => {
  const [dataArray, setDataArray] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getTwilioTags("twilio").then(async (res1) => {
      let tempKeys = [];
      let tempRelatedTags = [];
      let tempDatasets = [];

      for (let i = 0; i < res1.data.items.length; i++) {
        let tempData = [];
        let category = res1.data.items[i];
        let catIndex = i;

        if (tempKeys.indexOf(category.name) < 0) {
          tempKeys.push(category.name);
          tempData.push(0);
        }

        let relatedTagResponse = await getRelatedTags(category.name);
        console.log(`<<<< ${category.name} >>>>`); // Tag from all tags with "twilio" in its name

        let tempEverything = [];

        relatedTagResponse.data.items.forEach((item2) => {
          if (!tempRelatedTags.includes(item2.name)) {
            tempRelatedTags.push(item2.name);
            tempData[catIndex] = item2.count;

            tempDatasets.push({
              label: item2.name,
              data: tempData,
              backgroundColor: "rgb(54, 162, 235)",
            });
            tempData = [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0,
            ];
          }
        });

        tempEverything.push({ labels: tempKeys });
      }

      setDataArray({
        labels: tempKeys,
        datasets: tempDatasets,
      });
    });
  }, []);

  const options = {
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: false,
        },
      },
      x: {
        stacked: true,
      },
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

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Bar data={dataArray} options={options} redraw />
            {/* <Bar data={data} options={options} /> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Sankey;
