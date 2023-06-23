const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	email: String,
	name: String,
	password: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
