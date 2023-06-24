const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
	token: String,
});

const Blacklist = mongoose.model("blacklist", blacklistSchema);

module.exports = {
	Blacklist,
};
