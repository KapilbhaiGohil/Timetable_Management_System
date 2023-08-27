const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Timetable");

app.post("/register", async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.json(user);
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 3001;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
