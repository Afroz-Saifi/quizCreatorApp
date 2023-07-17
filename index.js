const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { quizRouter } = require("./routes/quiz.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Quiz builder")
})

app.use("/user/register", userRouter)
app.use("/quiz", quizRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connectDB;
    console.log("connected to db");
    console.log(`server running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
