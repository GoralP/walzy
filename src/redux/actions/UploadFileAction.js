import axios from "axios";
import { config } from "../../common";
import { toast } from "react-toastify";

export const uploadFile = (data, tagtitle, newitem, history) => {
  const getToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("title", tagtitle);
  for (var i = 0; i < newitem.length; i++) {
    formData.append("tag[]", newitem[i]);
  }

  formData.append("user_id", userId);
  formData.append("upload_type", "wallpaper");

  return (dispatch) => {
    dispatch({ type: "ADD_FILE_PENDING" });
    axios
      .post(`${config.apiUrl}/uploadFile`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "ADD_FILE_SUCCESS" });

        if (res.data.ResponseCode == 1) {
          toast.success(res.data.ResponseMessage);
          history.push("/wallpaper");
        } else {
          toast.error(res.data.ResponseMessage);
        }

       
      })
      .catch((error) => {
        dispatch({ type: "ADD_FILE_FAILURE", message: error.message });
        console.log(error.message);
      });
  };
};

export const uploadRingtone = (data, tagtitle, newitem, history) => {
  const getToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("title", tagtitle);
  for (var i = 0; i < newitem.length; i++) {
    formData.append("tag[]", newitem[i]);
  }

  formData.append("user_id", userId);
  formData.append("upload_type", "ringtone");

  return (dispatch) => {
    dispatch({ type: "ADD_FILE_PENDING" });
    axios
      .post(`${config.apiUrl}/uploadFile`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "ADD_FILE_SUCCESS" });
        toast.success(res.data.ResponseMessage);
        history.push("/ringtone");
      })
      .catch((error) => {
        dispatch({ type: "ADD_FILE_FAILURE", message: error.message });
        console.log(error.message);
      });
  };
};
