const express = require("express");
const HistoryRoute = express.Router();
const { HistoryModel } = require("../Models/history.model");



//Get User Specific history
HistoryRoute.get("/:id", async (req, res) => {

    const userid = req.params.id

    try {
        const data = await HistoryModel.find({ "userID": userid })
        console.log(data)
        res.status(200).send(data);
        
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})




module.exports = { HistoryRoute }