const initialState = {
  addFile: {
    loading: false,
    addData: null,
    error: false,
    message: null,
  },
};

const addFileReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FILE_PENDING":
      return {
        ...state,
        addFile: {
          loading: true,
          error: false,
          message: action.message,
        },
      };
    case "ADD_FILE_SUCCESS":
      return {
        ...state,
        addFile: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "ADD_FILE_FAILURE":
      return {
        ...state,
        addFile: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};

export default addFileReducers;
