const initialState = {
  wallpaper: {
    loading: false,
    wallpaperData: null,
    error: false,
    message: null,
  },
  ringtone: { loading: false, ringtoneData: null, error: false, message: null },
};

const allWallpaperRingoneReducers = (state = initialState, action) => {
  switch (action.type) {
    case "WALLPAPER_FETCH_PENDING":
      return {
        ...state,
        wallpaper: {
          loading: true,
          wallpaperData: null,
          error: false,
          message: null,
        },
      };
    case "WALLPAPER_FETCH_SUCCESS":
      return {
        ...state,
        wallpaper: {
          loading: false,
          wallpaperData: action.wallpaperData,
          error: false,
          message: null,
        },
      };
    case "WALLPAPER_FETCH_FAILURE":
      return {
        ...state,
        wallpaper: {
          loading: false,
          wallpaperData: null,
          error: true,
          message: action.message,
        },
      };
    case "RINGTONE_FETCH_PENDING":
      return {
        ...state,
        ringtone: {
          loading: true,
          ringtoneData: null,
          error: false,
          message: null,
        },
      };
    case "RINGTONE_FETCH_SUCCESS":
      return {
        ...state,
        ringtone: {
          loading: false,
          ringtoneData: action.ringtoneData,
          error: false,
          message: action.message,
        },
      };
    case "RINGTONE_FETCH_FAILURE":
      return {
        ...state,
        ringtone: {
          loading: false,
          data: null,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};
export default allWallpaperRingoneReducers;
