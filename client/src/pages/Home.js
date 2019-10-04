import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Transition } from "semantic-ui-react";

import SearchInput from "../components/SearchInput";
import BarCard from "../components/BarCard";

const Home = () => {
  const [location, setLocation] = useState("");
  // const [bars, setBars] = useState([]);

  const { loading, error, data } = useQuery(GET_BARS_QUERY, {
    variables: { location: location }
  });

  const handleLocation = useCallback(
    searchTerm => {
      setLocation(searchTerm);
    },
    [location]
  );

  // useEffect(() => {
  //   const barAr = [];
  //   barAr.push(data);
  //   setBars(barAr);
  // }, [bars]);

  console.log(location);
  console.log(data);
  return (
    <Grid columns={2}>
      <Grid.Row>
        <SearchInput handleLocation={handleLocation} />
      </Grid.Row>
      {loading ? (
        <h1>Searching..</h1>
      ) : (
        <Transition.Group>
          {data && data.getBars.map(bar => (
            <Grid.Column key={bar.id}>
              <BarCard bar={bar}/>
            </Grid.Column>
          ))}
        </Transition.Group>
      )}
    </Grid>
  );
};

export const GET_BARS_QUERY = gql`
  query getBars($location: String!) {
    getBars(location: $location) {
      id
      name
      url
      rating
      price
      image_url
      goings {
        username
      }
      goingCount
    }
  }
`;

export default Home;
