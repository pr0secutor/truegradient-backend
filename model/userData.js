const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDataSchema = new Schema({
  email_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserData", userDataSchema);
