const responseModel = require("../model/responseData");
const { AppError, Success } = require("../utils");

const getResponses = async (req, res) => {
  const responses = await responseModel.find();

  if (!responses) return res.status(404).json(AppError("No data found..."));

  return res
    .status(200)
    .json(Success("Data fetched Successfuly...", null, responses));
};

const saveResponse = async (req, res) => {
  const {
    question,
    summary,
    result_text,
    result_table_path,
    result_visualization_path,
    error,
  } = req.body;

  try {
    const existingResponse = await responseModel.findOne({
      question,
      summary,
      result_text,
      result_table_path,
      result_visualization_path,
      error,
    });

    if (existingResponse) {
      return res
        .status(409)
        .json(AppError("Response already exists."));
    }

    await responseModel.create({
      question,
      summary,
      result_text,
      result_table_path,
      result_visualization_path,
      error,
    });

    return res.status(200).json(Success("Response saved..."));
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error saving response.",
        error: err.message,
      });
  }
};

module.exports = { getResponses, saveResponse };
