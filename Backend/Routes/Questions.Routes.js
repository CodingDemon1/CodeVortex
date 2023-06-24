const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const QuestionRoute = express.Router();
const { HistoryModel } = require("../Models/history.model");

//OpenAI Config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//Routes
QuestionRoute.post("/query", async (req, res) => {
  const { role, experience } = req.body;

  // Set the prompt based on the received job role and experience
  const prompt = `Act as an Interviewer, For Job role ${role} developer and who's experience is ${experience} years, ask only two technical interview questions`;
  //
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

QuestionRoute.post("/rating", async (req, res) => {
  //Body should be in this format:
  // {
  //     "userid":"put_userid_here",
  //     "question1":"Put your question 1 here",
  //     "question2":"Put your question 2 here",
  //     "answer1":"Put your answer 1 here",
  //     "answer2":"Put your answer 2 here"
  // }
  const obj = [
    {
      question:  req.body.question1.question,
      answer:req.body.question1.answer,
    },
    {
      question:  req.body.question2.question,
      answer: req.body.question2.answer,
    },
  ];
  
  let objStr = JSON.stringify(obj);
  // Extract Question 1 and Answer 1 from req.body
  // const question1 = req.body.question1.question;
  // const answer1 = req.body.question1.answer;

  // // Extract Question 2 and Answer 2 from req.body
  // const question2 = req.body.question2.question;
  // const answer2 = req.body.question2.answer;

  // Set the prompt based on the received job role and experience, including the extracted values
  // const prompt = `Rate Each Answers out of 10 given to these below questions and justification(1 line) why you rated this particular number.

  // Question 1: ${question1}
  // Answer 1: ${answer1}

  // Question 2: ${question2}
  // Answer 2: ${answer2}`;
  // // console.log(prompt);
  const prompt = `read the following array of objects and rate the answer out of 10 according to their questions. 
	
	${objStr} 
	
    Level of the question is  hard so the response should be also based on that level

	Provide the response on this format : [
        score: {the score},
        feedback : {the feedback},
        extra : {extra information},
        error : {error if any}
    ]

    `;


  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 1, // Adjust the value to control the randomness of the generated text
      // stop: "\n",
    });

    let data = response.data.choices[0].text;

    console.log(data);

    //Saving data in History collection here
    const history = new HistoryModel({ body: data, userID: req.body.userid });
    await history.save();

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

module.exports = { QuestionRoute };
