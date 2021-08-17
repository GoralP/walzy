const intialState = {
  profile: { loading: false, profileData: null, error: false, message: null },
  updateProfile: { loading: false, error: false, message: null },
  allUserProfile: {
    loading: false,
    allUserData: null,
    error: false,
    message: null,
  },
};

const profileReducers = (state = intialState, action) => {
  switch (action.type) {
    case "GET_PROFILE_PENDING":
      return {
        ...state,
        profile: {
          loading: true,
          profileData: null,
          error: false,
          message: null,
        },
      };
    case "GET_PROFILE_SUCCESS":
      return {
        ...state,
        profile: {
          loading: false,
          profileData: action.profileData,
          error: false,
          message: null,
        },
      };
    case "GET_PROFILE_FAILURE":
      return {
        ...state,
        profile: {
          loading: false,
          profileData: null,
          error: true,
          message: null,
        },
      };
    case "UPDATE_PROFILE_FETCH_PENDING":
      return {
        ...state,
        updateProfile: { loading: true, error: false, message: null },
      };
    case "UPDATE_PROFILE_FETCH_SUCCESS":
      return {
        ...state,
        updateProfile: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "UPDATE_PROFILE_FETCH_FAILURE":
      return {
        ...state,
        updateProfile: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "ALL_USER_PROFILE_PENDING":
      return {
        ...state,
        allUserProfile: {
          loading: true,
          allUserData: null,
          error: false,
          message: null,
        },
      };
    case "ALL_USER_PROFILE_SUCCESS":
      return {
        ...state,
        allUserProfile: {
          loading: false,
          allUserData: action.allUserData,
          error: false,
          message: null,
        },
      };
    case "ALL_USER_PROFILE_FAILURE":
      return {
        ...state,
        allUserProfile: {
          loading: false,
          allUserData: null,
          error: true,
          message: null,
        },
      };
    default:
      return { ...state };
  }
};

export default profileReducers;
