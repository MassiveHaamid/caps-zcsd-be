const loginController = require("express").Router();
const { login } = require("../controllers/loginController");

//body parser
loginController.use(express.urlencoded({ extended: true }));
loginController.use(express.json());

loginController.post("/student/login", login);

module.exports = loginController;
