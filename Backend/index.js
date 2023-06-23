const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const socketio = require("socket.io");
const cors = require("cors");
const { UserRoute } = require("./Routes/Users.Routes");
const { connection } = require("./config/db");
const fetch = require("node-fetch");
const { JSON } = require("mysql/lib/protocol/constants/types");

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

//For Frontend - keep body in this JSON format:
// {
//     "prompt":"your query"
// }

app.post("/query", async (req, res) => {
	const { role, experience } = req.body;

	// Set the prompt based on the received job role and experience
	const prompt = `Act as an Interviewer, For Job role ${role} and Experience ${experience}, ask only two interview questions`;

	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			max_tokens: 300,
			temperature: 0.7, // Adjust the value to control the randomness of the generated text
			//   stop: "\n",
		});

		let data = response.data.choices[0].text
		let stringWithoutNewlines = data.replace(/\n\n/g, "");


		let qnArray = stringWithoutNewlines.split("\n")
		console.log(qnArray)



		return res.status(200).json({
			success: true,
			data: qnArray,
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

const obj = [
	{
	  question: "What is JavaScript?",
	  answer: "JavaScript is a server-side language",
	},
	{
	  question: "What is HTML?",
	  answer: "HTML is a programming language",
	},
  ];
  
  console.log(obj);
  let objStr = JSON.stringify(obj);

app.post("/rating", async (req, res) => {
	// const { qn1 , qn2 , ans1, ans2 } = req.body;
	
	

	// Set the prompt based on the received job role and experience
	const prompt = `read the following array of objects and rate the answer out of 10 according to their questions. 
	
	${objStr}
	
	Provide an object in that object there will be only two data, first one will be the overall score in number and the second one will be the justification`;

	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			// max_tokens: 300,
			// temperature: 0.7, // Adjust the value to control the randomness of the generated text
			//   stop: "\n",
		});

		// let data = response.data.choices[0].text
		// let stringWithoutNewlines = data.replace(/\n\n/g, "");


		// let qnArray = stringWithoutNewlines.split("\n")
		// console.log(qnArray)
		let data = response.data.choices[0].text;
		console.log(data)


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
