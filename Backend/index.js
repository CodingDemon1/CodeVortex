const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const socketio = require("socket.io");
const cors = require("cors");
const { UserRoute } = require("./Routes/Users.Routes");
const { connection } = require("./config/db");
const app = express();
app.use(express.json());
app.use("/user", UserRoute);

//OpenAI Config
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//Routes
app.get("/", (req, res) => {
	res.status(200).send("Home Page of Backend");
});

//For Frontend - keep body in this json format:
// {
//     "prompt":"your query"
// }

app.post("/query", async (req, res) => {
	const prompt = req.body.prompt || "how are you?";

	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
		});

		return res.status(200).json({
			success: true,
			data: response.data.choices[0].text,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			error: error.response
				? error.response.data
				: "There was an issue on the server",
		});
	}
});

//Server Running
const port = process.env.PORT || 5000;

app.listen(port, async () => {
	try {
		await connection();
		console.log(`Listening at port - ${port}`);
	} catch (error) {
		console.error(error.message);
	}
});
