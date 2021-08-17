import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

// function convertImgToBase64URL(url, callback, outputFormat) {
//   var img = new Image();
//   img.crossOrigin = "Anonymous";
//   img.onload = function () {
//     var canvas = document.createElement("CANVAS"),
//       ctx = canvas.getContext("2d"),
//       dataURL;
//     canvas.height = img.height;
//     canvas.width = img.width;
//     ctx.drawImage(img, 0, 0);
//     dataURL = canvas.toDataURL(outputFormat);
//     callback(dataURL);
//     canvas = null;
//   };
//   img.src = url;
// }

// function convertAudioToBase64URL(url) {
//   let document = "";
//   let reader = new FileReader();
//   reader.readAsDataURL(url);
//   reader.onload = function () {
//     document = reader.result;
//   };
//   reader.onerror = function (error) {
//     console.log("Error: ", error);
//   };

//   return document;
// }

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

export const downloadRingtone = (history) => {
  const getToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const getId = localStorage.getItem("clickedId");

  const formData = new FormData();

  if (userId && userId != "" && userId != null && userId != "undefined") {
    formData.append("user_id", userId);
  } else {
    formData.append("user_id", "");
  }

  // formData.append("user_id", userId);
  formData.append("upload_id", getId);
  return (dispatch) => {
    dispatch({ type: "DOWNLOAD_PENDING" });

    axios
      .post(
        `${config.apiUrl}/DownloadNow`,
        formData,

        {
          headers: {
            key: "69d5eb2052ac7712cf5e4b40famz3152",
            // token: `${getToken}`,
          },
          // responseType: "blob",
        }
      )
      .then((res) => {
        var resimageURL = res.data.DataResult.wallpaper_ringtone;
        // dispatch({ type: "DOWNLOAD_SUCCESS" });
        // toast.success(res.data.ResponseMessage);
        // console.log("resimageURL", resimageURL);
        toDataUrl(resimageURL, function (base64Audio) {
          var link = document.createElement("a");

          link.href = base64Audio;
          link.download = `${+new Date()}.mp3`;

          document.body.appendChild(link);

          link.click();

          dispatch({ type: "DOWNLOAD_SUCCESS" });
          toast.success(res.data.ResponseMessage);
          history.push("/");
        });
      })
      .catch((error) => {
        dispatch({ type: "DOWNLOAD_FAILURE", message: error.message });
      });
  };
};
