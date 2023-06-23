import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  let buttonDisabbled = listening;

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Sorry, your browser doesn't support speech recognition.</div>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <>
      <div className="flex justify-center items-center gap-3 mt-5 ">
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
          onClick={resetTranscript}
        >
          Reset
        </button>
      </div>
      <p className=" block">{transcript}</p>
    </>
  );
};

export default SpeechToText;
