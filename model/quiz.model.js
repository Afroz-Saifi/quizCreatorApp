const mongoose = require("mongoose");

const question_schema = new mongoose.Schema({
  title: String,
  answerOptions: [String],
  correctOptions: [Number],
});

const quiz_schema = new mongoose.Schema({
  creator: String,
  title: String,
  description: String,
  questions: [question_schema],
  leaderboard: [
    {
      email: String,
      score: Number,
    },
  ],
});

const Quiz = mongoose.model("quiz", quiz_schema);

module.exports = { Quiz };
