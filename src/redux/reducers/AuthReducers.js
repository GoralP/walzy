const initialState = {
  login: { loading: false, data: null, error: false, message: null },
  register: { loading: false, error: false, message: null },
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_FETCH_PENDING":
      return {
        ...state,
        login: {
          loading: true,
          data: null,
          error: false,
          message: null,
        },
      };
    case "LOGIN_FETCH_SUCCESS":
      return {
        ...state,
        login: {
          loading: false,
          data: action.data,
          error: false,
          message: null,
        },
      };
    case "LOGIN_FETCH_PENDING":
      return {
        ...state,
        login: {
          loading: false,
          data: null,
          error: true,
          message: action.message,
        },
      };
    case "REGISTRATION_PENDING":
      return {
        ...state,
        register: { loading: true, error: false, message: null },
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        register: { loadin: false, error: false, message: null },
      };
    case "REGISTRATION_FAILURE":
      return {
        ...state,
        register: { loading: false, error: true, message: action.message },
      };
    default:
      return { ...state };
  }
};

export default authReducers;
