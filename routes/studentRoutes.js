const studentRouter = require("express").Router();
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

module.exports = studentRouter;
