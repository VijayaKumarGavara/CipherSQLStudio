const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  column_name: {
    type: String,
    required: true
  },
  data_type: {
    type: String,
    required: true
  }
}, { _id: false });

const tableSchema = new mongoose.Schema({
  table_name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  columns: {
    type: [columnSchema],
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);