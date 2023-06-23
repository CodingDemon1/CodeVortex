import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Question from "./Question";
import { BsRecord2Fill } from "react-icons/bs";
import "./SpeechToText.css";

const SpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [intervieweeAnswer, setIntervieweeAnswer] = useState("");

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
  }

  return (
    <div className="m-4 md:m-10">
      <div className="flex gap-2 flex-col lg:flex-row">
        <div className="text-left p-4 lg:min-w-[50%]">
          <Question />
        </div>
        <div className=" border-2 border-black text-left p-4 rounded min-h-[400px] lg:min-w-[50%] xl:min-h-[500px]">
          <p className=" block">{transcript}</p>
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
            className={` bg-orange-500 text-white p-1 pl-2 pr-2 min-w-[100px] rounded ${
              buttonDisabbled ? " cursor-no-drop bg-opacity-60" : ""
            }`}
            onClick={startListening}
            disabled={listening}
          >
            Start
          </button>
          <button
            className={` bg-red-600 text-white p-1 pl-2 pr-2 rounded min-w-[100px] ${
              !buttonDisabbled
                ? " cursor-no-drop bg-opacity-80 text-opacity-70"
                : ""
            }`}
            onClick={stopListening}
            disabled={!listening}
          >
            Stop
          </button>
          <button
            className={` bg-cyan-600 text-white p-1 pl-2 pr-2 rounded min-w-[100px] }`}
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
