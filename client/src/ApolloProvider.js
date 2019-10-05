import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from 'apollo-link-context';
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";

import React from "react";
import App from "./App";

const httpLink = createHttpLink({
  uri: "http://localhost:5000"
});

// const authLink = setContext(() => {
//   const token = localStorage.getItem("jwtToken");
//   console.log(token);
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ""
//     }
//   };
// });

const client = new ApolloClient({
  link: httpLink,
  // onError: ({ networkError, graphQLErrors }) => {
  //     console.log('graphQLErrors', graphQLErrors)
  //     console.log('networkError', networkError)
  //   },
//   link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
