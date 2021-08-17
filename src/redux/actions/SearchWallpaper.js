import axios from "axios";
import { config } from "../../common";

export const searchWallpaper = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  var searchData = localStorage.getItem("searchValue");
  // console.log("search123", searchData);
  formData.append("search", searchData);
  formData.append("type", "wallpaper");

  return (dispatch) => {
    dispatch({ type: "SEARCH_WALLPAPER_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/search`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })
      .then((res) => {
        console.log("res_chk", res);
        if(res.data.ResponseCode == 1) {
          localStorage.setItem("wallpaper_list", JSON.stringify(res.data.Result));
          localStorage.setItem("searchData", "");
          dispatch({
            type: "SEARCH_WALLPAPER_FETCH_SUCCESS",
            searchWallpaperData: res.data.Result,
          });
        }
        else
        {
          dispatch({
            type: "SEARCH_WALLPAPER_FETCH_FAILURE",
            message: res.data.ResponseMessage
          });
        }
      })
      .catch((error) => {
        console.log("error_chk", error);
        dispatch({
          type: "SEARCH_WALLPAPER_FETCH_FAILURE",
          message: error.message,
        });
      });
  };
};
