const initialState = {
  getFavorite: {
    loading: false,
    getFavoriteData: null,
    error: false,
    message: null,
  },
  addFavorite: {
    loading: false,
    addFavoriteData: null,
    error: false,
    message: null,
  },
};

const favoriteReducers = (state = initialState, action) => {
  switch (action.type) {
    case "FAVORITE_FETCH_PENDING":
      return {
        ...state,
        getFavorite: {
          loading: true,
          getFavoriteData: null,
          error: false,
          message: null,
        },
      };
    case "FAVORITE_FETCH_SUCCESS":
      return {
        ...state,
        getFavorite: {
          loading: false,
          getFavoriteData: action.getFavoriteData,
          error: false,
          message: action.message,
        },
      };
    case "FAVORITE_FETCH_FAILURE":
      return {
        ...state,
        getFavorite: {
          loading: false,
          getFavoriteData: null,
          error: true,
          message: action.message,
        },
      };

    case "ADD_FAVORITE_PENDING":
      return {
        ...state,
        addFavorite: {
          loading: true,
          error: false,
          message: action.message,
        },
      };
    case "ADD_FAVORITE_SUCCESS":
      return {
        ...state,
        addFavorite: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "ADD_FAVORITE_FAILURE":
      return {
        ...state,
        addFavorite: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};

export default favoriteReducers;
