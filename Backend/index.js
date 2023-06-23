const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const socketio = require("socket.io");
const cors = require("cors");
const { UserRoute } = require("./Routes/Users.Routes");
const { connection } = require("./config/db");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(cors());
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

    let data = response.data.choices[0].text;
    let stringWithoutNewlines = data.replace(/\n\n/g, "");

    let qnArray = stringWithoutNewlines.split("\n");
    console.log(qnArray);

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

app.post("/rating", async (req, res) => {
  // Extract Question 1 and Answer 1 from req.body
  const question1 = req.body.question1;
  const answer1 = req.body.answer1;

  // Extract Question 2 and Answer 2 from req.body
  const question2 = req.body.question2;
  const answer2 = req.body.answer2;

  // Set the prompt based on the received job role and experience, including the extracted values
  const prompt = `Rate Each Answers out of 10 given to these below questions and justification(1 line) why you rated this particular number.

	Question 1: ${question1}
	Answer 1: ${answer1}
	
	Question 2: ${question2}
	Answer 2: ${answer2}`;
  // console.log(prompt);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0.7, // Adjust the value to control the randomness of the generated text
      // stop: "\n",
    });

    let data = response.data.choices[0].text;

    console.log(data);

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
          ? error.response.data.error.message
          : "There was an issue on the server"
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
