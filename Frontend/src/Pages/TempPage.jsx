import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const TempPage = () => {
  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const questions = useSelector((store) => store.reducer.question);
  console.log(questions);

  if (Object.keys(questions).length == 0) {
    return <Navigate to={"/home"} />;
  } else {
    sendInterviewQuestionsAndAnswers();
  }

  function sendInterviewQuestionsAndAnswers() {
    axios
      .post(`${url}/rating`, questions, {
        headers: {
          "Content-Type": "application/json",
          //   Auth: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return <div>TempPage</div>;
};

export default TempPage;
