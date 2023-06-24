import React from "react";
import SpeechToText from "../component/SpeechToText";
import { useSelector } from "react-redux";

const InterviewPage = () => {
  const questions = useSelector((store) => store.reducer.question);
  const questionNumber = useSelector((store) => store.reducer.questionNumber);

  return (
    <div>
      <SpeechToText questions={questions} questionNumber={questionNumber} />
    </div>
  );
};

export default InterviewPage;
