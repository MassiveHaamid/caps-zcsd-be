const express = require("express");
const loginRouter = express.Router();
const { login } = require("../controllers/loginController");

var bodyParser = require("body-parser");
loginRouter.use(bodyParser.urlencoded({ extended: false }));

loginRouter.post("/student/login", async (req, res, next) => {
  try {
    await login(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error on login, please try again" });
  }
});

module.exports = loginRouter;
