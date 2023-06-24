import React, { useState } from 'react';
import FeedbackCard from '../component/FeedbackCard';
import './scores.css'; 

const Score = () => {
  const feedbacks = [
    {
      score: 8,
      author: "John Doe",
      message: "I had a wonderful time using your product. It's amazing!",
    },
    {
      score: 9,
      author: "Jane Smith",
      message: "Your team provided exceptional support. Thank you!",
    },
    {
      score: 3,
      author: "John Doe",
      message: "I had a terrible experience with your product. It needs improvement.",
    },
   
  ];

  // const [feedbacks,setFeedbacks] =useState([])

  //  fetch("http://localhost:5000/history/:id").then((res)=>res.json())
  //  .then((data)=>{
  //   console.log(data)
  //  })
  //  .catch((err)=>{
  //   console.log(err)
  //  })

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
