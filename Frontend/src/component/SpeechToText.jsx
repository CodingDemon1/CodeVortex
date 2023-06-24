import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Question from "./Question";
import { BsRecord2Fill } from "react-icons/bs";
import "./SpeechToText.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { UPDATE_ANSWER } from "../Redux/actionTypes";

const SpeechToText = ({ questions, questionNumber }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [intervieweeAnswer, setIntervieweeAnswer] = useState("");
  const startBtn = document.querySelector(".startBtn");
  const answerContainer = document.querySelector(".answerContainer");
  const [timer1, setTimer1] = useState(5);
  const [answerTimer, setAnswerTimer] = useState(30);
  const showTimer1 = useRef(true);
  const showTimer2 = useRef(false);
  const [disableStopBtn, setDisableStopBtn] = useState(true);

  const studentQuestionAnswer = questions;
  console.log(studentQuestionAnswer);
  const [questionNumberTracker, setQuestionNumberTracker] = useState(1);

  // const questions = useSelector((store) => store.reducer.question);
  // const questionNumber = useSelector((store) => store.reducer.questionNumber);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(showTimer1);
  console.log(showTimer2, startBtn);
  console.log(questions);
  // console.log(Object.keys(studentQuestionAnswer).length, "LENGTh");
  //

  let alertTimerId;
  let answerTimerId;

  useEffect(() => {
    if (showTimer1.current == true) {
      alertTimerId = setInterval(() => {
        setTimer1((prev) => {
          if (prev <= 0) {
            startListening();
            setTimer1(5);
            showTimer1.current = false;
            showTimer2.current = true;
            clearInterval(alertTimerId);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    //

    if (showTimer2.current == true) {
      answerTimerId = setInterval(() => {
        setAnswerTimer((prev) => {
          if (prev == 0) {
            clearInterval(answerTimerId);
            stopListening();
            // dispatch({
            //   type: UPDATE_ANSWER,
            //   answer: answerContainer.textContent,
            // });
            updateAnserFromStudent();
            resetTranscript();
            if (
              questionNumberTracker < Object.keys(studentQuestionAnswer).length
            ) {
              showTimer1.current = true;
              showTimer2.current = false;
              setQuestionNumberTracker((prev) => prev + 1);
              return 30;
            } else {
              dispatch({ type: UPDATE_ANSWER, payload: studentQuestionAnswer });
              navigate("/feedback");
            }
            return 0;
          } //

          if (prev < 20) {
            setDisableStopBtn(false);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (alertTimerId) {
        clearInterval(alertTimerId);
      }

      if (answerTimerId) {
        clearInterval(answerTimerId);
      }
    };
  }, [showTimer2.current, showTimer1.current]);

  if (Object.keys(studentQuestionAnswer).length == 0) {
    return <Navigate to={"/home"} />;
  }

  let buttonDisabbled = listening;

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Sorry, your browser doesn't support speech recognition.</div>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIntervieweeAnswer(transcript);
    SpeechRecognition.stopListening();
  };

  function handleReset() {
    resetTranscript();
    console.log(intervieweeAnswer, "ANSWER");
  }

  function updateAnserFromStudent() {
    studentQuestionAnswer[`question${questionNumberTracker}`].answer =
      answerContainer.textContent;
    answerContainer.textContent = "";
    resetTranscript();
  }

  return (
    <div className="m-4 md:m-10">
      <div>
        {showTimer1.current == true ? (
          <div>Start answering the question in {timer1}</div>
        ) : (
          <div>Remaining time to answer {answerTimer}</div>
        )}
      </div>
      <div className="flex gap-2 flex-col lg:flex-row">
        <div className="text-left p-4 lg:min-w-[50%]">
          <Question
            question={questions[`question${questionNumberTracker}`].question}
          />
        </div>
        <div className=" border-2 border-black text-left p-4 rounded min-h-[400px] lg:min-w-[50%] xl:min-h-[500px]">
          <p className="answerContainer block">{transcript}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-10 lg:flex-row">
        <div
          className={` text-3xl text-red-600  ${
            listening ? "toggle" : "invisible"
          }`}
        >
          <BsRecord2Fill />
        </div>{" "}
        <div className="flex gap-2">
          <button
            className={`startBtn hidden bg-orange-500 text-white p-1 pl-2 pr-2 min-w-[100px] rounded ${
              buttonDisabbled ? " cursor-no-drop bg-opacity-60" : ""
            }`}
            onClick={startListening}
            disabled={listening}
          >
            Start
          </button>
          <button
            className={`stopBtn bg-[#d747ef] text-white p-1 pl-2 pr-2 rounded min-w-[100px] ${
              !buttonDisabbled || disableStopBtn
                ? " cursor-no-drop bg-opacity-80 text-opacity-70"
                : ""
            }`}
            onClick={stopListening}
            disabled={disableStopBtn}
          >
            Stop
          </button>
          <button
            className={` bg-[#8c5bf5] text-white p-1 pl-2 pr-2 rounded min-w-[100px] }`}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
