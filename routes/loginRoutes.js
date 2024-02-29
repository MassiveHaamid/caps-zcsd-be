const express = require("express");
const loginController = express.Router();
const login = require("../controllers/loginController");

var bodyParser = require("body-parser");
loginController.use(bodyParser.urlencoded({ extended: false }));

loginController.post("/student/login", (req, res) => {
  console.log(req.body.email);
});

// Error handling middleware
loginController.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = loginController;
