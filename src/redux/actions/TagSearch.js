import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const getTagWallpaper = (data) => {
  const getToken = localStorage.getItem("token");
  var searchTagVal = localStorage.getItem("searchTagValue");
  var userId = localStorage.getItem("userId");
  var formData = new FormData();
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
    dispatch({ type: "TAG_SEARCH_DATA_PENDING" });
    axios
      .post(`${config.apiUrl}/AllWallpaper`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })
      .then((res) => {
        if(res.data.ResponseCode == 1) {
          localStorage.setItem("wallpaper_list", JSON.stringify(res.data.Result));
          dispatch({
            type: "TAG_SEARCH_DATA_SUCESS",
            wallpaperData: res.data.Result,
          });
        }
        else{
          dispatch({ type: "TAG_SEARCH_DATA_FAILURE", message: res.data.ResponseMessage });
        }
      })
      .catch((error) => {
        dispatch({ type: "TAG_SEARCH_DATA_FAILURE", message: error.message });
      });
  };
};
