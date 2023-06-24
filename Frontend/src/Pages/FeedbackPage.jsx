import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { INTERVIEW_FEEDBACK } from "../Redux/actionTypes";
import { useToast } from "@chakra-ui/react";
import PerfomanceFeedback from "./PerfomanceFeedback";

const FeedbackPage = () => {
  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const questions = useSelector((store) => store.reducer.question);
  // const feedback = useSelector((store) => store.reducer.feedback);
  const dispatch = useDispatch();
  // console.log(feedback, "FEEDBACK");
  const toast = useToast();

  if (Object.keys(questions).length == 0) {
    return <Navigate to={"/home"} />;
  } else {
    sendInterviewQuestionsAndAnswers();
  }

  function sendInterviewQuestionsAndAnswers() {
    axios
      .post(
        `${url}/question/rating`,
        { ...questions, id: localStorage.getItem("id") },
        {
          headers: {
            "Content-Type": "application/json",
            // Auth: localStorage.getItem("token"),
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success == true) {
          dispatch({ type: INTERVIEW_FEEDBACK, payload: res.data.data });
        }
        toast({
          title: `${res.data.msg ? res.data.msg : "Generating feedback"}`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: `${err.message ? err.message : "Something went wrong!"}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      });
  }

  return (
    <div>
      <PerfomanceFeedback />
    </div>
  );
};

export default FeedbackPage;
