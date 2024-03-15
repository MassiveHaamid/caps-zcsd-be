const express = require("express");
const studentRouter = express.Router();
const {
  signupStudent,
  updateStudent,
  confirmStudent,
  forgotPassword,
  resetPassword,
} = require("../controllers/studentController");

var bodyParser = require("body-parser");
studentRouter.use(bodyParser.urlencoded({ extended: false }));

studentRouter.post("/student/signup", async (req, res, next) => {
  try {
    console.log("req, res");
    await signupStudent(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error on sign up, please try again" });
  }
});

studentRouter.put("/student/update", async (req, res, next) => {
  try {
    await updateStudent(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error on update, please try again" });
  }
});

studentRouter.patch("/student/confirm/:id", async (req, res, next) => {
  try {
    await confirmStudent(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error on confirm, please try again" });
  }
});

studentRouter.put("/student/forgot", async (req, res, next) => {
  try {
    await forgotPassword(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error on forgot password, please try again" });
  }
});

studentRouter.patch("/student/reset/:id", async (req, res, next) => {
  try {
    await resetPassword(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error on reset password, please try again" });
  }
});

module.exports = studentRouter;
