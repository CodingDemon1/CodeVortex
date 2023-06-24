import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { INTERVIEW_FEEDBACK } from "../Redux/actionTypes";

const FeedbackPage = () => {
  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const questions = useSelector((store) => store.reducer.question);
  // const feedback = useSelector((store) => store.reducer.feedback);
  const dispatch = useDispatch();
  // console.log(feedback, "FEEDBACK");

  if (Object.keys(questions).length == 0) {
    return <Navigate to={"/home"} />;
  } else {
    sendInterviewQuestionsAndAnswers();
  }

  function sendInterviewQuestionsAndAnswers() {
    axios
      .post(`${url}/question/rating`, questions, {
        headers: {
          "Content-Type": "application/json",
          //   Auth: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success == true) {
          dispatch({ type: INTERVIEW_FEEDBACK, payload: res.data.data });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  }

  return <div>FeedbackPage</div>;
};

export default FeedbackPage;
