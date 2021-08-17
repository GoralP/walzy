import axios from "axios";
import { config } from "../../common";
import { toast } from "react-toastify";

export const feedback = (data) => {
  const userId = localStorage.getItem("userId");
  const getId = localStorage.getItem("clickId");
  const formData = new FormData();
  // formData.append("user_id", userId);
  formData.append("upload_id", getId);
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return (dispatch) => {
    dispatch({ type: "FEEDBACK_PENDING" });
    axios
      .post(`${config.apiUrl}/flag`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })
      .then((res) => {
        dispatch({ type: "FEEDBACK_SUCCESS" });
        toast.success(res.data.ResponseMessage);
      })
      .catch((error) => {
        dispatch({ type: "FEEDBACK_FAILURE", message: error.message });
      });
  };
};
