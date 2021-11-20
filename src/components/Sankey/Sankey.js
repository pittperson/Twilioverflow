import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Bar } from 'react-chartjs-2';





const Sankey = () => {
  // const [twilioTags, setTwilioTags] = useState({});
  const [twilioTags, setTwilioTags] = useState([]);
  const [keys, setKeys] = useState([]);
  const [everything, setEverything] = useState({})

  

  useEffect(() => {
    getTwilioTags("twilio").then((res1) => {
      let tempKeys = [];
      res1.data.items.forEach((item1, index1) => {
        if (tempKeys.indexOf(item1.name) < 0) {
          tempKeys.push(item1.name);
        }

        getRelatedTags(item1.name).then((res2) => {
          console.log(`<<<< ${item1.name} >>>>`)
          let tempDatasets = [];
          let tempData = [];
          let tempEverything = [];

          res2.data.items.forEach((item2, index2) => {
            if (item1.name !== item2.name) {
              console.log(`${item2.name} : ${item2.count}`)
              tempData.push(item2.count);
            }
          });

          res2.data.items.forEach((item2, index2) => {
            if (item1.name !== item2.name) {
              tempDatasets.push({label: item2.name, data: tempData});
            }
          });
          setTwilioTags((prevState) => [...prevState, ...tempDatasets]);
          // tempEverything.push({labels: tempKeys});
        });
      });
      setKeys(tempKeys);
    });
  }, []);

  console.log(keys);
  console.log(twilioTags)
  const all = ({labels: keys, datasets: twilioTags})
  console.log(all)

  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Red Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '# of Blue Votes',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: '# of Green Votes',
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  console.log(data)

  const options = {
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      },
      x: {
        stacked: true
      }
    }
  };

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

    queryUrl = `https://api.stackexchange.com/2.3/tags/${tagName}/related?pagesize=3&site=stackoverflow&key=DkLwlYTWw9AoNuzTYgmnUg((`;
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
          <Bar data={data} options={options} />
          <Bar data={all} options={options} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Sankey;
