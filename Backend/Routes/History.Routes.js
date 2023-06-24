const express = require("express");
const HistoryRoute = express.Router();
const { HistoryModel } = require("../Models/history.model");

//Get User Specific history
HistoryRoute.get("/:id", async (req, res) => {
  const id = req.params.id;
  //   console.log("IM HERE VERIFY", id);
  try {
    const data = await HistoryModel.find({ userID: id });
    console.log(data, "DATA");
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { HistoryRoute };
