import React, { useEffect, useState } from "react";
import FeedbackCard from "../component/FeedbackCard";
import "./scores.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Score = () => {
  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  // const feedbacks = [
  //   {
  //     score: 8,
  //     author: "John Doe",
  //     message: "I had a wonderful time using your product. It's amazing!",
  //   },
  //   {
  //     score: 9,
  //     author: "Jane Smith",
  //     message: "Your team provided exceptional support. Thank you!",
  //   },
  //   {
  //     score: 3,
  //     author: "John Doe",
  //     message:
  //       "I had a terrible experience with your product. It needs improvement.",
  //   },
  // ];

  const [feedbacks, setFeedbacks] = useState([]);

  const user = useSelector((store) => store.reducer.user);
  console.log("USER", user);

  useEffect(() => {
    fetchUserFeedbackData();
  }, []);

  function fetchUserFeedbackData() {
    axios
      .get(`${url}/history/${user._id || localStorage.getItem("id")}`)
      .then((res) => {
        console.log(res);
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="score-container">
      <div className="feedback-list">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};
export default Score;
