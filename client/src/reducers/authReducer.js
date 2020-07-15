const INITIAL_STATTE = {
  signedIn: null,
  userId: null,
};

const authReducer = (state = INITIAL_STATTE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, signedIn: true, userId: action.payload };
    case "SIGN_OUT":
      return { ...state, signedIn: false, userId: null };
    default:
      return state;
  }
};

export default authReducer;
