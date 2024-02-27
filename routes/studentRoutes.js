const express = require("express");
const studentRouter = express.Router();
const {
  signupStudent,
  updateStudent,
  confirmStudent,
  forgotPassword,
  resetPassword,
} = require("../controllers/studentController");

//body parser
studentRouter.use(express.urlencoded({ extended: true }));
studentRouter.use(express.json());

// sign up new student
studentRouter.post("/student/signup", signupStudent);

// updating student profile
studentRouter.put("/student/update", updateStudent);

// confirming/authenticate student account
studentRouter.patch("/student/confirm/:id", confirmStudent);

// Creating link for reseting password
studentRouter.put("/student/forgot", forgotPassword);

// reseting password
studentRouter.patch("/student/reset/:id", resetPassword);

// Error handling middleware
studentRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = studentRouter;
