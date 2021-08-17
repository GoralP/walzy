import React, { useState, useEffect } from "react";
import login from "../images/login.png";
import { Button } from "reactstrap";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineGoogle } from "react-icons/ai";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { loginWithGoogle, loginWithFacebook } from "../redux/actions";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { config } from '../common';

const Login = () => {
  const getToken = localStorage.getItem("token");
  const history = useHistory();
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    console.log(response);
  };
  const [close, setClose] = useState(true);

  const handleSuccess = (data) => {
    console.log('google login data',data);
    if(data && data.googleId){
      data.google_id = data.googleId;
      data.name = data.profileObj.name;
      data.email = data.profileObj.email;
      dispatch(loginWithGoogle(data, history));
    }
  };

  useEffect(() => {
    if (getToken) {
      history.push("/");
    }
  });

  const handleSuccessFacebook = (data) => {
    console.log('fb login data',data);
    if(data && data.id){
      data.fb_id = data.id;
      data.name = data.name;
      data.email = data.email;
      dispatch(loginWithFacebook(data, history));
    }
  };

  return (
    <>
      <div fluid={true}>
        <div className="section-login-bg">
          <div className="login-main-block ">
            <div className="login-form-close-btn">
              <Link to="/">
                <Button className="login-close-btn">
                  <RiCloseFill />
                </Button>
              </Link>
            </div>
            <div className="login-form-layout">
              <div className="row">
                <div className="col-sm-6">
                  <img src={login} alt="" className="login-img" />
                </div>
                <div className="col-sm-6">
                  <div className="social-media-login-block">
                    <div>
                      <h2>Welcome Back!</h2>
                    </div>
                    <div>
                      {/* <Button className="facebook-btn">
                        <GrFacebookOption className="social-media-icon " />
                        Login With Facebook
                      </Button> */}
                      <FacebookLogin
                        appId={config.FBAPPID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={handleSuccessFacebook}
                        cssClass="facebook-btn"
                        icon={
                          <GrFacebookOption className="social-media-icon " />
                        }
                      />
                    </div>
                    <div>
                      {/* <Button className="google-btn">
                        <AiOutlineGoogle className="social-media-icon " />
                        Login With Google
                      </Button> */}
                      {/* <br></br> */}
                      <GoogleLogin
                        // clientId="570994484809-68tfn841n71kmq07l0im0r2t61vo6vkv.apps.googleusercontent.com" // for live
                        // clientId="527223402818-olngi4nodajghi4v2ntoc5husi5f2680.apps.googleusercontent.com" //for local
                        clientId={config.GOOGLEAPIKEY} //for local
                        buttonText="Login with Google"
                        onSuccess={handleSuccess}
                        // onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        className="google-btn"
                      />
                    </div>
                    <div className="by-joining">
                      By joining, You agree to<br></br>
                      <Link to="/terms" className="terms-of-service">
                        Terms of Service
                      </Link>
                      and
                      <Link to="/privacy" className="terms-of-service">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
