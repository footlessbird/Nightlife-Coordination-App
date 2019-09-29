const fetchBars = require("../../api/index");

module.exports = {
  Query: {
    async getBars(_, { location }) {
      const businesses = await fetchBars(location);
      return businesses
    }
  }
};
