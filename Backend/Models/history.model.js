const mongoose = require("mongoose");

//History Schema
const historySchema = mongoose.Schema(
  {
    body: String,
    userID: String,
    date: String,
  },
  {
    versionKey: false,
  }
);

const HistoryModel = mongoose.model("history", historySchema);

module.exports = { HistoryModel };
