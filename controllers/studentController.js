const Student = require("../models/studentModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { EMAIL_ADDRESS, EMAIL_PASSWORD, FEURL } = require("../utils/config");

const signupStudent = async (req, res) => {
  try {
    const {
      name,
      lName,
      email,
      contactNo,
      experience,
      qualification,
      password,
    } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "all fields are mandatory" });
      return;
    }

    const matchedStudent = await Student.findOne({ email });
    if (matchedStudent) {
      res.status(400).json({ message: "Student already exists" });
      return;
    }

    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const link = `${FEURL}/confirm/${randomString}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      lName,
      email,
      experience,
      qualification,
      contactNo,
      password: hashedPassword,
      resetToken: randomString,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });

    const sendMail = async () => {
      const info = await transporter.sendMail({
        from: `"Haamid" <${EMAIL_ADDRESS}>`,
        to: student.email,
        subject: "Confirm account",
        text: link,
      });
    };

    sendMail();

    res
      .status(201)
      .json({ message: `account created successfully ${student.name}` });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on sign up please try again" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const {
      name,
      lName,
      email,
      contactNo,
      qualification,
      experience,
      password,
    } = req.body;

    const matchedStudent = await Student.findOne({ email });

    if (!matchedStudent) {
      res.status(400).json({
        message: "please enter valid email / Entered mail not registered",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    matchedStudent.name = name;
    matchedStudent.lName = lName;
    matchedStudent.contactNo = contactNo;
    matchedStudent.qualification = qualification;
    matchedStudent.experience = experience;
    matchedStudent.password = hashedPassword;

    await Student.findByIdAndUpdate(matchedStudent.id, matchedStudent);

    res
      .status(201)
      .json({ message: `account updated successfully`, matchedStudent });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating please try again later" });
  }
};

const confirmStudent = async (req, res) => {
  try {
    const resetToken = req.params.id;
    const matchedStudent = await Student.findOne({ resetToken });

    if (matchedStudent === null || matchedStudent.resetToken === "") {
      return res
        .status(400)
        .json({ message: "student not exists or link expired" });
    }

    matchedStudent.verified = true;

    matchedStudent.resetToken = "";

    await Student.findByIdAndUpdate(matchedStudent.id, matchedStudent);

    res.status(201).json({
      message: `${matchedStudent.name} account has been verified successfully`,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "student not exists or link expired" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const matchedStudent = await Student.findOne({ email });

    if (!matchedStudent) {
      res.status(400).json({
        message: "please enter valid email / Entered mail not registered",
      });
      return;
    }

    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const link = `${FEURL}/reset/${randomString}`;

    matchedStudent.resetToken = randomString;

    await Student.findByIdAndUpdate(matchedStudent.id, matchedStudent);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });

    const sendMail = async () => {
      const info = await transporter.sendMail({
        from: `"Haamid" <${EMAIL_ADDRESS}>`,
        to: matchedStudent.email,
        subject: "Reset Password",
        text: link,
      });
    };

    sendMail()
      .then(() => {
        return res
          .status(201)
          .json({ message: `Mail has been send to ${matchedStudent.email}` });
      })
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating please try again later" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const resetToken = req.params.id;

    const matchedStudent = await Student.findOne({ resetToken });

    if (matchedStudent === "null" || matchedStudent.resetToken === "") {
      return res
        .status(400)
        .json({ message: "student not exists or reset link expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    matchedStudent.password = hashedPassword;
    matchedStudent.resetToken = "";

    await Student.findByIdAndUpdate(matchedStudent.id, matchedStudent);

    res.status(201).json({
      message: `${matchedStudent.name} password has been updated successfully`,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "student not exists or reset link expired" });
  }
};

module.exports = {
  signupStudent,
  updateStudent,
  confirmStudent,
  forgotPassword,
  resetPassword,
};
