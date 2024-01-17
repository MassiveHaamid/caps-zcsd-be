const loginController = require("express").Router();
const { login } = require("../controllers/loginController");

loginController.post("/student/login", login);

module.exports = loginController;
