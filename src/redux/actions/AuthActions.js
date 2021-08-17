import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const loginWithGoogle = (data, history) => {
  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("is_google", 1);
  return (dispatch) => {
    dispatch({ type: "LOGIN_FETCH_PENDING" });
    axios
      .post(`${config.apiUrl}/is_Registration`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })
      .then((res) => {
        console.log(res);
          if(res.data.ResponseCode == 3){
            console.log('test loginwithGoogle');
            registerUser(data, history,0,1);
          }
          else if (res.data.ResponseCode == 1) {
            localStorage.setItem("token", res.data.Result.generate_token);
            localStorage.setItem("userId", res.data.Result.id);
    
            dispatch({ type: "LOGIN_FETCH_SUCCESS", message: res.data.ResponseMessage });

           toast.success(res.data.ResponseMessage);
           history.push("/");
         } else {
            dispatch({ type: "LOGIN_FETCH_FAILURE" });
           toast.error(res.data.ResponseMessage);
         }

        
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FETCH_FAILURE" });
        toast.error(error);
      });
  };
};

export const loginWithFacebook = (data, history) => {
  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("is_fb", 1);
  return (dispatch) => {
    dispatch({ type: "LOGIN_FETCH_PENDING" });
    axios
      .post(`${config.apiUrl}/is_Registration`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })
      .then((res) => {
        console.log(res);
        if(res.data.ResponseCode == 3){
          registerUser(data, history,1,0);
        }
        else if (res.data.ResponseCode == 1) {
          localStorage.setItem("token", res.data.Result.generate_token);
          localStorage.setItem("userId", res.data.Result.id);
          
          dispatch({ type: "LOGIN_FETCH_SUCCESS" });
          
         toast.success(res.data.ResponseMessage);
         history.push("/");
       } else {
          dispatch({ type: "LOGIN_FETCH_FAILURE" });
         toast.error(res.data.ResponseMessage);
       }
        
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FETCH_FAILURE" });
        toast.error(error);
      });
  };
};

export const googleSignup = (data, history) => {
  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("is_google", 1);
  return (dispatch) => {
    dispatch({ type: "REGISTRATION_PENDING" });
    axios
      .post(`${config.apiUrl}/sign_up`, formData, {
        headers: { key: "69d5eb2052ac7712cf5e4b40famz3152" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.ResponseCode == 0) {
          
          dispatch({ type: "REGISTRATION_FAILURE" });
          toast.error(res.data.ResponseMessage);

        } else {
          if(res.data.Result){
            localStorage.setItem("token", res.data.Result.generate_token);
            localStorage.setItem("userId", res.data.Result.id);
            
            dispatch({ type: "LOGIN_FETCH_SUCCESS" });

            toast.success(res.data.ResponseMessage);
            history.push("/");
          }
          else
          {
            dispatch({ type: "REGISTRATION_FAILURE" });
            toast.error(res.data.ResponseMessage);
          }
          
        }
        
      })
      .catch((error) => {
        dispatch({ type: "REGISTRATION_FAILURE" });
        toast.error(error.message);
      });
  };
};

export const facebookSignup = (data, history) => {
  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  // formData.append("is_google", 1);
  return (dispatch) => {
    dispatch({ type: "REGISTRATION_PENDING" });
    axios
      .post(`${config.apiUrl}/sign_up`, formData, {
        headers: { key: "69d5eb2052ac7712cf5e4b40famz3152" },
      })
      .then((res) => {
        console.log(res);
        
       if (res.data.ResponseCode == 0) {
         
        dispatch({ type: "REGISTRATION_FAILURE" });
        toast.error(res.data.ResponseMessage);
       } else {
          if(res.data.Result){
            localStorage.setItem("token", res.data.Result.generate_token);
            localStorage.setItem("userId", res.data.Result.id);

            dispatch({ type: "LOGIN_FETCH_SUCCESS" });

            toast.success(res.data.ResponseMessage);
            history.push("/");
          }
          else
          {
            dispatch({ type: "REGISTRATION_FAILURE" });
            toast.error(res.data.ResponseMessage);
          }
       }
        
      })
      .catch((error) => {
        dispatch({ type: "REGISTRATION_FAILURE" });
        toast.error(error.message);
      });
  };
};

function registerUser(data, history,is_fb,is_google){
  console.log('registerUser')
  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("is_google", is_google);
  formData.append("is_fb", is_fb);
    axios
      .post(`${config.apiUrl}/sign_up`, formData, {
        headers: { key: "69d5eb2052ac7712cf5e4b40famz3152" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.ResponseCode == 0) {
          
          toast.error(res.data.ResponseMessage);

        } else {
          if(res.data.Result){
            localStorage.setItem("token", res.data.Result.generate_token);
            localStorage.setItem("userId", res.data.Result.id);
            

            toast.success(res.data.ResponseMessage);
            history.push("/");
          }
          else
          {
            toast.error(res.data.ResponseMessage);
          }
          
        }
        
      })
      .catch((error) => {
        toast.error(error.message);
      });
}