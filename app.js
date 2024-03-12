require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { URL } = require("./utils/config");

const loginRouter = require("./routes/loginRoutes");
const studentRouter = require("./routes/studentRoutes");

// Middleware
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(URL)

  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to Zen-Dashboard");
});

// Routes
app.use(loginRouter);
app.use(studentRouter);

let attendanceData = {
  presentDays: 15,
  totalDays: 20,
};

// Endpoint to get attendance data
app.get("/api/attendance", (req, res) => {
  res.json(attendanceData);
});

// Endpoint to update attendance data
app.post("/api/attendance", (req, res) => {
  const { presentDays, totalDays } = req.body;

  // Validate and update attendance data
  attendanceData = {
    presentDays: parseInt(presentDays, 10),
    totalDays: parseInt(totalDays, 10),
  };

  res.json(attendanceData);
});

let taskScoreData = [];

for (let day = 1; day <= 42; day++) {
  const randomScore = Math.floor(Math.random() * 101); // Generating a random score between 0 and 100
  taskScoreData.push({ day, score: randomScore });
}

console.log(taskScoreData);

// Endpoint to get task score data
app.get("/api/tasks", (req, res) => {
  res.json(taskScoreData);
});

// Endpoint to update task score data
app.post("/api/tasks", (req, res) => {
  const updatedTaskScoreData = req.body;

  // Validate and update task score data
  taskScoreData = updatedTaskScoreData;

  res.json(taskScoreData);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
