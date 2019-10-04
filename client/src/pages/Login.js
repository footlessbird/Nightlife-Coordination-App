import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {AuthContext} from '../context/auth'
import {useForm} from '../util/hooks'

const Login = (props) => {
  const context = useContext(AuthContext)  
  const [errors, setErrors] = useState({});
  const {onChange, onSubmit, values} = useForm(loginCallback, {
      username: "",
      password: ""  
  })


  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // update will be triggered if mutation is successfully executed
    update(proxy, {data: {login: userData}}) {
      console.log(userData);
      context.login(userData)
      props.history.push('/')
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

  function loginCallback(){
      loginUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
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
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
    }
  }
`;

export default Login;
