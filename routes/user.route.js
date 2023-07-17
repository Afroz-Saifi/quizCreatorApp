const express = require("express");
const { User } = require("../model/user.model");
const { Quiz } = require("../model/quiz.model");

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        message: "user already registered",
      });
    }
    const userData = new User({email, name})
    await userData.save();
    return res.status(200).json({
      message: "user registered successfully",
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

module.exports = { userRouter };
