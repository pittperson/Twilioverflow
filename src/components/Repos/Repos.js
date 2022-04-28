import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getTwilioRepos, getTwilioTags } from "../../helpers/getTwilioTags";
import RepoCard from "./RepoCard";

const Repos = () => {
  const [repos, setRepos] = useState();

  useEffect(() => {
    getTwilioRepos("twilio").then((res) => {
      console.log(res.data);

      let tempRepos = [];

      for (let x = 0; x < res.data.length; x++) {
        tempRepos.push(<RepoCard key={x} name={res.data[x].name} />);
      }

      setRepos(tempRepos);
    });
  }, []);

  return <Container>{repos}</Container>;
};

export default Repos;
