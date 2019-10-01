const { model, Schema } = require("mongoose");

const placeSchema = new Schema({
  yelp_id: String,
  goings: [
    {
      username: String,
      createdAt: String
    }
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   createdAt: String
    // }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Place", placeSchema);
