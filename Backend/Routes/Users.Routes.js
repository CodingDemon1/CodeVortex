const { Blacklist } = require("../Models/blacklist.model");
const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRoute = require("express").Router();

UserRoute.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const isUserExist = await UserModel.findOne({ email });
		// console.log(isUserExist);

		console.log(isUserExist);
		if (isUserExist) {
			return res.send({
				msg: "user already exist in the database try with new email",
			});
		}

		const hash = bcrypt.hashSync(password, 8);
		// console.log(hash);
		const user = new UserModel({ name, email, password: hash });
		// console.log(user);
		await user.save();

		res.send({ msg: "user has been registered successfully" });
	} catch (error) {
		res.send({ msg: error.msg });
	}
});
UserRoute.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const isUserExist = await UserModel.findOne({ email });

		if (!isUserExist) {
			return res.status(401).send({ msg: "invalid username or password" });
		}

		var result = bcrypt.compareSync(password, isUserExist.password);
		// console.log(result);
		if (!result) {
			return res.status(401).send({ msg: "invalid username or password" });
		}

		const Accesstoken = jwt.sign(
			{ userID: isUserExist._id },
			process.env.secretKey
		);
		console.log(Accesstoken);

		res.send({ msg: "login successfull", user: isUserExist, Accesstoken });
	} catch (error) {
		res.send({ msg: error.msg });
	}
});
UserRoute.get("/logout", async (req, res) => {
	// we wil get the accesstoken and refreshtoken in req.headers with the respective name;
	try {
		const accesstoken = req.headers.authorization;

		const blackAccess = new Blacklist({ token: accesstoken });
		await blackAccess.save();

		res.send({ msg: "logout successfull....." });
	} catch (error) {
		res.send({ msg: error.msg });
	}
});

module.exports = { UserRoute };
