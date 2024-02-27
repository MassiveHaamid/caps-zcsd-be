const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/config");

// Function to handle login

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    //getting email and password from student
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    // search and find the document of the student with email
    const student = await Student.findOne({ email });
    console.log("student", student);
    // if student not found send error
    if (!student) {
      return res
        .status(401)
        .json({ message: "invalid username/Please Sign-up" });
    }

    const passwordCheck = await bcrypt.compare(password, student.password);

    // if student password does not match send error
    if (!passwordCheck) {
      return res.status(401).json({ message: "password incorrect" });
    }

    // generate JWT token
    // const studentToken = { name: student.name, id: student._id, };
    // const token = jwt.sign(studentToken, SECRET, { expiresIn: 60 * 60 });
    const token = jwt.sign({ id: student._id }, SECRET, { expiresIn: "1d" });

    //if everything is ok send response
    res.status(200).send({ token, student });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on sign up please try again" });
  }
};

module.exports = login;
