import { QUESTIONS_UPDATE, UPDATE_ANSWER, USER_AUTH } from "./actionTypes";

const initialState = {
  auth: false,
  token: "",
  question: {},
  questionNumber: 1,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH:
      return { ...state, auth: action.auth, token: action.payload };

    case QUESTIONS_UPDATE:
      return { ...state, question: action.payload };

    case UPDATE_ANSWER:
      console.log("INREDUX", action.payload);
      return {
        ...state,
        question: action.payload,
      };

    default: {
      return state;
    }
  }
};
