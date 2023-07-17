const express = require("express");
const { User } = require("../model/user.model");
const { Quiz } = require("../model/quiz.model");

const quizRouter = express.Router();

quizRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newQuiz = new Quiz(data);
    await newQuiz.save();
    return res.status(201).json({
      error: false,
      message: "quiz created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

quizRouter.get("/", async (req, res) => {
  try {
    const quizes = await Quiz.find();
    if (quizes.length == 0) {
      return res.status(404).json({
        error: true,
      });
    }
    return res.status(200).json({
      data: quizes,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

quizRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Quiz.findById(id);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

quizRouter.put("/score/:id", async (req, res) => {
  const { email, score } = req.body;
  const {id} = req.params

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { $push: { leaderboard: { email, score } } }
    );

    if (updatedQuiz) {
      return res.status(200).json({
        message: "Score updated",
      });
    } else {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
        error: true,
        message: error.message
    });
  }
});

quizRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        await Quiz.findByIdAndDelete(id)
        return res.status(200).json({
            message: "quiz deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

quizRouter.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        await Quiz.findByIdAndUpdate(id, req.body)
        return res.status(200).json({
            message: "quiz updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

module.exports = { quizRouter };
