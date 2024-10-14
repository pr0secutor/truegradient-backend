const mongoose = require("mongoose");
const { Schema } = mongoose;

const responseDataSchema = new Schema({
  created_by: {
    type: String
  },
  question: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  result_text: {
    type: String,
    required: true,
  },
  result_table_path: {
    type: String,
    required: true,
  },
  result_visualization_path: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("ResponseData", responseDataSchema);
