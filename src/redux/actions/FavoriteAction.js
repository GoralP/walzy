import axios from "axios";
import { config } from "../../common";
import { toast } from "react-toastify";

export const favoriteWallpaper = (data) => {
  const getToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const getId = localStorage.getItem("clickedId");
  const formData = new FormData();

  formData.append("user_id", userId);
  formData.append("upload_id", getId);
  return (dispatch) => {
    dispatch({ type: "FAVORITE_FETCH_PENDING" });
    axios
      .post(`${config.apiUrl}/FavoriteUploadList`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        localStorage.setItem(
          "fav_wallpaper_list",
          JSON.stringify(res.data.Result.wallpaper)
        );
        localStorage.setItem(
          "fav_Ringtone_list",
          JSON.stringify(res.data.Result.ringtone)
        );
        dispatch({
          type: "FAVORITE_FETCH_SUCCESS",
          getFavoriteData: res.data.Result,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FAVORITE_FETCH_PENDING",
          message: error.message,
        });
      });
  };
};

export const addFavoriteWallpaper = (history) => {
  const getToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const getId = localStorage.getItem("clickedId");
  console.log("getId", getId);
  const formData = new FormData();

  formData.append("user_id", userId);
  formData.append("upload_id", getId);
  return (dispatch) => {
    dispatch({ type: "ADD_FAVORITE_PENDING" });
    axios
      .post(`${config.apiUrl}/FavoriteUnfavoriteUpload`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        // localStorage.setItem(res.data.DataResult);
        console.log(res);
        dispatch({
          type: "ADD_FAVORITE_SUCCESS",
        });
        // localStorage.setItem("favResult", res.data.DataResult);
        // toast.success(res.data.ResponseMessage);
      })
      .catch((error) => {
        dispatch({
          type: "ADD_FAVORITE_FAILURE",
          message: error.message,
        });
      });
  };
};
