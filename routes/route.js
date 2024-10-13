const { Router } = require("express");
const {
  getResponses,
  saveResponse,
} = require("../controller/responseController");
const { apiResponse } = require("../controller/apiController");
const { login, signUp } = require("../controller/userController");

const router = Router();

router.get("/healthy", async (req, res) => {
  return res.status(200).json("App running...");
});
router.get("/get_responses", getResponses);
router.post("/save_response", saveResponse);
router.post("/api", apiResponse)
router.post("/login", login)
router.post("/signup", signUp)

module.exports = router;
