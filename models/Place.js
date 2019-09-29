const { model, Schema } = require("mongoose");

const placeSchema = new Schema({
  yelp_id: String,
  usersAttending: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = model("Place", placeSchema);
