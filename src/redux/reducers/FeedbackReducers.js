const initialState = {
  loading: true,
  feedbackData: null,
  error: false,
  message: null,
};

const feedbackReducers = (state = initialState, action) => {
  switch (action.type) {
    case "FEEDBACK_PENDING":
      return {
        ...state,
        loading: true,
        feedbackData: null,
        error: false,
        message: null,
      };
    case "FEEDBACK_SUCCESS":
      return {
        ...state,
        loading: false,
        feedbackData: action.feedbackData,
        error: false,
        message: null,
      };
    case "FEEDBACK_PENDING":
      return {
        ...state,
        loading: false,
        feedbackData: null,
        error: true,
        message: action.message,
      };
    default:
      return { ...state };
  }
};

export default feedbackReducers;
