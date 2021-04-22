const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };
    case "ADD_PLAYER_SUCCESS":
      console.log("player added successfully");
      return {
        ...state,
        authError: null,
      };
    case "ADD_PLAYER_ERROR":
      console.log("player add error");
      return {
        ...state,
        authError: "Adding Player failed",
      };
    case "REFRESH_SUCCESS":
      console.log("REFRESH SUCCESSFULL");
      return {
        ...state,
        authError: null,
      };
    case "REFRESH_ERROR":
      console.log("REFRESH ERROR");
      return {
        ...state,
        authError: "REFRESH ERROR",
      };

    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message,
      };

    default:
      return state;
  }
};

export default authReducer;
