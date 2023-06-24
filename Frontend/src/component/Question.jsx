import React from "react";

const Question = ({ question }) => {
  console.log(question);
  return <div className=" text-xl font-medium	">{question}</div>;
};

export default Question;
