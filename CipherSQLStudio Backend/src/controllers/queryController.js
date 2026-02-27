const pool = require("../config/postgres");
const Question = require("../models/questionModel");
const validateQuery = require("../utils/queryValidator");

const normalize = (rows) =>
  rows.map(r => JSON.stringify(r)).sort();

exports.executeQuery = async (req, res) => {
  try {
    const { question_id, query } = req.body;

    if (!question_id || !query) {
      return res.status(400).json({
        success: false,
        message: "Missing question_id or query"
      });
    }

    validateQuery(query);

    const question = await Question.findOne({ question_id })
      .select("+question_expected_query");

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    let userResult;
    try {
      userResult = await pool.query(query);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "SQL Error",
        error: error.message
      });
    }

    const expectedResult = await pool.query(
      question.question_expected_query
    );

    const userRowsNormalized = normalize(userResult.rows);
    const expectedRowsNormalized = normalize(expectedResult.rows);

    const success =
      JSON.stringify(userRowsNormalized) ===
      JSON.stringify(expectedRowsNormalized);

    return res.json({
      success,
      message: success
        ? "Correct Answer"
        : "Incorrect Answer",

      actualOutput: userResult.rows,     
      expectedOutput: expectedResult.rows 
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};