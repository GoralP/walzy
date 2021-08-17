import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const getAllWallpaper = (data) => {
  const getToken = localStorage.getItem("token");
  var searchval = localStorage.getItem("searchValue");
  var searchTagVal = localStorage.getItem("searchTagValue");
  var userId = localStorage.getItem("userId");
  var formData = new FormData();
  if (
    searchval &&
    searchval != "" &&
    searchval != null &&
    searchval != "undefined"
  ) {
    formData.append("search", searchval);
  }
  if (
    searchTagVal &&
    searchTagVal != "" &&
    searchTagVal != null &&
    searchTagVal != "undefined"
  ) {
    formData.append("tag_search", searchTagVal);
  }

  if (userId && userId != "" && userId != null && userId != "undefined") {
    formData.append("user_id", userId);
  }
  return (dispatch) => {
    dispatch({ type: "WALLPAPER_FETCH_PENDING" });
    axios
      .post(`${config.apiUrl}/AllWallpaper`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.ResponseCode == 1) {
          localStorage.setItem("fav", res.data.DataResult);
          localStorage.setItem(
            "wallpaper_list",
            JSON.stringify(res.data.Result)
          );

          dispatch({
            type: "WALLPAPER_FETCH_SUCCESS",
            wallpaperData: res.data.Result,
          });
        } else {
          dispatch({
            type: "WALLPAPER_FETCH_FAILURE",
            message: res.data.ResponseMessage,
          });
        }
      })
      .catch((error) => {
        dispatch({ type: "WALLPAPER_FETCH_FAILURE", message: error.message });
      });
  };
};

export const getAllRingtone = (data) => {
  const getToken = localStorage.getItem("token");
  var searchTagVal = localStorage.getItem("searchTagRingtone");
  var searchval = localStorage.getItem("searchValue");
  var userId = localStorage.getItem("userId");
  var formData = new FormData();
  if (
    searchval &&
    searchval != "" &&
    searchval != null &&
    searchval != "undefined"
  ) {
    formData.append("search", searchval);
  }
  if (
    searchTagVal &&
    searchTagVal != "" &&
    searchTagVal != null &&
    searchTagVal != "undefined"
  ) {
    formData.append("tag_search", searchTagVal);
  }
  if (userId && userId != "" && userId != null && userId != "undefined") {
    formData.append("user_id", userId);
  }
  return (dispatch) => {
    dispatch({ type: "RINGTONE_FETCH_PENDING" });
    axios
      .post(`${config.apiUrl}/AllRingtone`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
          // token: `${getToken}`,
        },
      })
      .then((res) => {
        if (res.data.ResponseCode == 1) {
          localStorage.setItem(
            "ringtone_list",
            JSON.stringify(res.data.Result)
          );
          dispatch({
            type: "RINGTONE_FETCH_SUCCESS",
            ringtoneData: res.data.Result,
          });
        } else {
          dispatch({
            type: "RINGTONE_FETCH_FAILURE",
            message: res.data.ResponseMessage,
          });
        }
      })
      .catch((error) => {
        dispatch({ type: "RINGTONE_FETCH_FAILURE", message: error.message });
      });
  };
};
