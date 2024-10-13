const userModel = require("../model/userData");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json(AppError("No Input..."));

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json(AppError("User Not Found..."));

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = generateToken(email);
    return res.status(200).json(Success("User Logged in...", token));
  }
  return res.status(404).json(AppError("Wrong Password"));
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json(AppError("All required Fields are not present..."));

  const oldUser = await userModel.findOne({ email });
  if (oldUser) return res.status(409).json(AppError("User Already Exists..."));
  const enrcryptedPassword = await bcrypt.hash(password, 10);

  await userModel.create({
    email,
    password: enrcryptedPassword,
  });
  return res.status(200).json(Success("New user Created..."));
};

module.exports = { login, signUp };
