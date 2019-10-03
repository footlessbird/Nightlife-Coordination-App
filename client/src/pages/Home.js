import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

// export const GET_BARS = gql`query ($location: String!) {
//   getBars(location: $location) {

// const FETCH_BARS_QUERY = gql`
// query getbars($location: String){
//   getBars(location: $location){
//     id
//     name
//     goings{
//       username
//     }
//     goingCount
//   }
//   }
// }
// `;
export default Home;
