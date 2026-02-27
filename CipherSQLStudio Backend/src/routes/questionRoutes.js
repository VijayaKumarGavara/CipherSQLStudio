const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  getQuestionById
} = require("../controllers/questionController");

router.get("/", getAllQuestions);
router.get("/:question_id", getQuestionById);

module.exports = router;