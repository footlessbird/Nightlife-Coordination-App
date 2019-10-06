import axios from "axios";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";

import {GET_BARS_QUERY} from '../pages/Home'

const GoButton = ({ user, bar }) => {
  const {token} = user
  const { id, goings, goingsCount } = bar;
  const [going, setGoing] = useState(false);

  useEffect(() => {    
    if (user && goings.find(going => going.username)) {
      setGoing(true);
    } else {
      setGoing(false);
    }
  }, [user, goings]);

  const [userGoes] = useMutation(GO_MUTATION, {
    variables: { yelp_id: id },
    update(proxy, result){
      const data = proxy.readQuery({
       query : GET_BARS_QUERY 
      })
      data.getBars = [result.userGoes, ...data.getBars]
      proxy.writeQuery({query: GET_BARS_QUERY, data})
    }
  });

  // const goButton = user ? (
  //   going ? (
  //     <Button color="red">
  //       <Icon name="check" />
  //     </Button>
  //   ) : (
  //     <Button color="red" basic>
  //       <Icon name="check" />
  //     </Button>
  //   )
  // ) : (
  //   <Button as={Link} to="/login" color="red" basic>
  //     <Icon name="check" />
  //   </Button>
  // );
  // return (
  //   <Button as="div" labelPosition="right" onClick={userGoes}>
  //     {goButton}
  //   </Button>
  // );
  return(
    <Button onClick={userGoes}>Go</Button>
  )
};

const GO_MUTATION = gql`
  mutation go($yelp_id: String!) {
    go(yelp_id: $yelp_id)
  }
`;

export default GoButton;
