const userModel = require("../model/userData");
const { generateToken, Success, AppError } = require("../utils");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email_id, password } = req.body;

  if (!email_id || !password)
    return res.status(400).json(AppError("No Input..."));

  const user = await userModel.findOne({ email_id });
  if (!user) return res.status(404).json(AppError("User Not Found..."));

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = generateToken(email_id);
    if (user.email_id === "admin@gmail.com")
      return res
        .status(200)
        .json(Success("Admin logged in...", token, { role: "admin" }));
    return res
      .status(200)
      .json(Success("User Logged in...", token, { role: "user" }));
  }
  return res.status(404).json(AppError("Wrong Password"));
};

const signUp = async (req, res) => {
  const { email_id, password } = req.body;

  if (!email_id || !password)
    return res
      .status(400)
      .json(AppError("All required Fields are not present..."));

  const oldUser = await userModel.findOne({ email_id });
  if (oldUser) return res.status(409).json(AppError("User Already Exists..."));
  const enrcryptedPassword = await bcrypt.hash(password, 10);

  await userModel.create({
    email_id,
    password: enrcryptedPassword,
  });
  return res.status(200).json(Success("New user Created..."));
};

module.exports = { login, signUp };
