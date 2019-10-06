require("dotenv").config();
const yelp = require("yelp-fusion");
// const fetch = require("node-fetch");
const client = yelp.client(process.env.YELP_API_KEY);

module.exports = async location => {
  try {
    const res = await client.search({
      term: "bars",
      location,
      limit: 10
    });
    return res.jsonBody.businesses;
  } catch (err) {
    throw new Error(err);
  }
};

// module.exports = async location => {
//   return fetch(
//     `https://api.yelp.com/v3/businesses/search?term=bars&location=${location}&limit=10`,
//     {
//       headers: {
//         Authorization: "Bearer " + process.env.YELP_API_KEY
//       }
//     }
//   )
//     .then(r => r.json())
//     .then(r => {
//       if (r.error) throw new Error(r.error);
//       return r.businesses;
//     });
// };
