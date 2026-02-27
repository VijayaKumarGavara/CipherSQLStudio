const Question = require("../models/questionModel");
const Table = require("../models/tableModel");
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .select("-question_expected_query")
      .populate("tables_involved");

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findOne({question_id:req.params.question_id})
      .select("-question_expected_query")
      .populate("tables_involved");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({success:true, question});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};