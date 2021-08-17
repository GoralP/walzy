const initialState = {
  searchWallpaper: {
    loading: false,
    searchWallpaperData: null,
    error: false,
    message: null,
  },
};

const searchWallpaperReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_WALLPAPER_FETCH_PENDING":
      return {
        ...state,
        searchWallpaper: {
          loading: true,
          searchWallpaperData: null,
          error: false,
          message: null,
        },
      };
    case "SEARCH_WALLPAPER_FETCH_SUCCESS":
      return {
        ...state,
        searchWallpaper: {
          loading: false,
          searchWallpaperData: action.searchWallpaperData,
          error: false,
          message: null,
        },
      };
    case "SEARCH_WALLPAPER_FETCH_FAILURE":
      return {
        ...state,
        searchWallpaper: {
          loading: false,
          searchWallpaperData: null,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};

export default searchWallpaperReducers;
