import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";

const Register = props => {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerCallback, {
    username: "",
    password: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // update will be triggered if mutation is successfully executed
    update(proxy, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    // variables:{
    //     username: values.username,
    //     password: values.password
    // }

    variables: values
  });

  function registerCallback(){
      addUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          label="password"
          placeholder="password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      username
      token
    }
  }
`;

export default Register;
