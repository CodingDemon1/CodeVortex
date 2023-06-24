import {
  INTERVIEW_FEEDBACK,
  QUESTIONS_UPDATE,
  UPDATE_ANSWER,
  USER_AUTH,
  USER_LOGOUT,
} from "./actionTypes";

const initialState = {
  auth: false,
  token: "",
  question: {},
  feedback: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH:
      return { ...state, auth: action.auth, token: action.payload };

    case QUESTIONS_UPDATE:
      return { ...state, question: action.payload };

    case INTERVIEW_FEEDBACK:
      return { ...state, feedback: action.payload };

    case UPDATE_ANSWER:
      console.log("INREDUX", action.payload);
      return {
        ...state,
        question: action.payload,
      };
    case USER_LOGOUT:
      return initialState;

    default: {
      return state;
    }
  }
};
