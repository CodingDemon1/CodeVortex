import { USER_AUTH } from "./actionTypes";

const initialState = {
  auth: false,
  token: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH:
      return { ...state, auth: action.auth, token: action.payload };

    default: {
      return state;
    }
  }
};
