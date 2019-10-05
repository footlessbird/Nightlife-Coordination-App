import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import GoButton from "./GoButton";
import { AuthContext } from "../context/auth";

const BarCard = ({ bar }) => {
  const { user } = useContext(AuthContext);
  console.log('barcard user', user)
  console.log(user);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          size="massive"
          src={bar.image_url}
          style={{ width: 400, height: 300 }}
          centered
        />
        <Card.Header as={Link} to={bar.url}>
          {bar.name}
        </Card.Header>
        <Card.Meta>{bar.goingCount}</Card.Meta>
      </Card.Content>
      {user && (
        <GoButton user={user} bar={bar}>
          Go
        </GoButton>
      )}
    </Card>
  );
};

export default BarCard;
