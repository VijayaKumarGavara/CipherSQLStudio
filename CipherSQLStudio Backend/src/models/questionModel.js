const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  question_title: {
    type: String,
    required: true,
    index: true
  },

  question_description: {
    type: String,
    required: true
  },

  question_level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
    index: true
  },

  tables_involved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  }],

  question_expected_query: {
    type: String,
    required: true,
    select: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);

