require("dotenv").config();

// const axios = require("axios");
const fetch = require("node-fetch");

module.exports = async location => {
  return fetch(
    `https://api.yelp.com/v3/businesses/search?term=bars&location=${location}&limit=10`,
    {
      headers: {
        Authorization: "Bearer " + process.env.YELP_API_KEY
      }
    }
  )
    .then(r => r.json())
    .then(r => {
      if (r.error) throw new Error(r.error);
      return r.businesses;
    });
};
