const intialState = {
  download: {
    loading: false,
    downloadData: null,
    error: false,
    message: null,
  },
};

const DownloadReducers = (state = intialState, action) => {
  switch (action.type) {
    case "DOWNLOAD_PENDING":
      return {
        ...state,
        download: {
          loading: true,
          downloadData: null,
          error: false,
          message: null,
        },
      };
    case "DOWNLOAD_SUCCESS":
      return {
        ...state,
        download: {
          loading: false,
          downloadData: action.downloadData,
          error: false,
          message: null,
        },
      };
    case "DOWNLOAD_FAILURE":
      return {
        ...state,
        download: {
          loading: false,
          downloadData: null,
          error: true,
          message: action.message,
        },
      };

    default:
      return { ...state };
  }
};

export default DownloadReducers;
