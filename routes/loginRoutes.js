const loginRouter = require("express").Router();
const { login } = require("../controllers/login.js");

// var bodyParser = require("body-parser");
// loginRouter.use(bodyParser.urlencoded({ extended: false }));

loginRouter.post("/student/login", login);

module.exports = loginRouter;
