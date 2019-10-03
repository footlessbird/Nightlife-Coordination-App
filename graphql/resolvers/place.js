const Place = require("../../models/Place");
const checkAuth = require("../../checkAuth");
const fetchBars = require("../../api/index");

module.exports = {
  Query: {
    async getBars(_, { location }) {
      const businesses = await fetchBars(location);

      // businesses.map(b=>{
      //   yelp_id = b.id
      // })
      // return businesses

      ////////////////////////////////////////////////////////////////////////////////////////

      const savedVenues = await getSavedVenues();
      // console.log(savedVenues)

      const updatedYelp = await businesses.map((biz, i) => {
        const newObj = Object.assign({}, biz);
        newObj.goings = [];
        // console.log('this is newObj ',newObj)
        return newObj;
      });

      const finalRes = updatedYelp.map(biz => {
        // console.log(savedVenues);
        // console.log("biz id", biz.id);
        savedVenues.forEach(venue => {
          // console.log("venue yelp id", venue.yelp_id);
          if (biz.id === venue.yelp_id) {
            biz.goings.push(...venue.goings);
          }
        });
        // console.log('this is biz ',biz)
        return biz;
      });
      // console.log(finalRes);
      return finalRes;
    }
  },
  Mutation: {
    async go(_, { yelp_id }, context) {
      const user = checkAuth(context);
      const bar = await Place.findOne({ yelp_id });

      if (bar) {
        if (bar.goings.find(going => going.username === user.username)) {
          bar.goings = bar.goings.filter(
            going => going.username !== user.username
          );
        } else {
          await bar.goings.push(user);
        }
        const savedBar = await bar.save();
        return savedBar.goings.length;
      } else {
        const newBar = await Place.create({ yelp_id });
        await newBar.goings.push(user);
        const savedBar = await newBar.save();
        // console.log("NewVenue and Attendee: ", savedBar);
        return savedBar.goings.length;
      }
    }
  }
};

function getSavedVenues() {
  // This returns venues with attendees and
  // returns the "refs" for User
  return Place.find({})
    // .populate("goings") !impotant causes error goings not sync
    .then(venues => {
      console.log(venues)
      return venues;
    })
    .catch(err => console.log(err));
}
