import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
// import { AuthContext } from "../context/auth";

const BarCard = ({ bar }) => {
  // const { user } = useContext(AuthContext);

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
      {/* {user && <Button>Go</Button>} */}
    </Card>
  );
};

export default BarCard;
