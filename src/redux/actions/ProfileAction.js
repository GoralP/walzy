import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const getProfile = () => {
  const getToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const formData = new FormData();

  formData.append("user_id", userId);
  return (dispatch) => {
    dispatch({ type: "GET_PROFILE_PENDING" });

    axios
      .post(`${config.apiUrl}/profile`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "GET_PROFILE_SUCCESS", profileData: res.data.Result });
      })
      .catch((error) => {
        dispatch({ type: "GET_PROFILE_FAILURE", message: error.message });
      });
  };
};

export const updateProfile = (data, history) => {
  const getToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  var formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("user_id", userId);

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return (dispatch) => {
    dispatch({ type: "UPDATE_PROFILE_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/updateProfile`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "UPDATE_PROFILE_FETCH_SUCCESS",
        });
        toast.success(res.data.ResponseMessage);
        history.push("/profile");
      })
      .catch((error) => {
        dispatch({
          type: "UPDATE_PROFILE_FETCH_FAILURE",
          message: error.message,
        });
        toast.error("Something went wrong");
      });
  };
};

export const getAllUserProfile = () => {
  const getToken = localStorage.getItem("token");
  const userId = localStorage.getItem("wallpaper_user_id");

  const formData = new FormData();

  formData.append("user_id", userId);
  return (dispatch) => {
    dispatch({ type: "ALL_USER_PROFILE_PENDING" });

    axios
      .post(`${config.apiUrl}/userProfile`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ALL_USER_PROFILE_SUCCESS",
          allUserData: res.data.Result,
        });
      })
      .catch((error) => {
        dispatch({ type: "ALL_USER_PROFILE_FAILURE", message: error.message });
      });
  };
};
