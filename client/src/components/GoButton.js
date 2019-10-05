import axios from "axios";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";

const GoButton = ({ user, bar }) => {
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
    variables: { yelp_id: id }
  });

  const goButton = user ? (
    going ? (
      <Button color="red">
        <Icon name="check" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="check" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="check" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={userGoes}>
      {goButton}
    </Button>
  );
};

const GO_MUTATION = gql`
  mutation go($yelp_id: ID!) {
    go(yelp_id: $yelp_id)
  }
`;

export default GoButton;
