const webcodeRouter = require("express").Router();
const { fetchWebcode, postWebcode } = require("../controllers/webcode.js");

// fetching all webcode

webcodeRouter.get("/student/webcode", fetchWebcode);

//posting new webcode data

webcodeRouter.post("/student/webcode", postWebcode);

module.exports = webcodeRouter;
