const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscribeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const SubscribeModel = mongoose.model("subscriptions", SubscribeSchema);
module.exports = SubscribeModel;
