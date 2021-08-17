import React, { useEffect } from "react";
import "./App.css";
// import "react-tabs/style/react-tabs.css";
import { Main } from "./view";
import {
  Wallpaper,
  Login,
  Upload,
  Signup,
  Profile,
  EditProfile,
  Favorites,
  Home,
  Ringtone,
  Search,
  SearchRingtone,
  Privacy,
  Terms,
  CookiePolicy,
  OnlineSafety,
  IprPolicy,
  ItPolicy,
  TagWallpaper,
  AllUserProfile,
} from "./container";
import store from "./redux/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";

function App() {
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    localStorage.removeItem("typeWallpaper");
    localStorage.removeItem("typeRingtone");
  });
  return (
    <div>
      <Provider store={store}>
        <Router basename="/walzy/">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/wallpaper" component={Wallpaper} exact={true} />
            {/* {getToken ? (
              <Redirect to="/" />
            ) : (
              <Route path="/login" component={Login} exact={true} />
            )} */}
            <Route path="/login" component={Login} exact={true} />
            <Route path="/wallpaper/:id" component={Wallpaper} exact={true} />
            <Route path="/ringtone/:id" component={Ringtone} exact={true} />
            <Route path="/upload" component={Upload} exact={true} />
            <Route path="/signup" component={Signup} exact={true} />
            <Route path="/profile" component={Profile} exact={true} />
            <Route path="/editprofile" component={EditProfile} exact={true} />
            <Route path="/favorites" component={Favorites} exact={true} />
            <Route path="/ringtone" component={Ringtone} exact={true} />
            <Route
              path="/ringtone/:id/:tag"
              component={Ringtone}
              exact={true}
            />
            <Route
              path="/wallpaper/:id/:tag"
              component={Wallpaper}
              exact={true}
            />
            <Route path="/ringtone/:tag" component={Ringtone} exact={true} />
            <Route path="/search" component={Search} exact={true} />
            <Route path="/terms" component={Terms} exact={true} />
            <Route path="/privacy" component={Privacy} exact={true} />
            <Route path="/cookie" component={CookiePolicy} exact={true} />
            <Route path="/onlinesafety" component={OnlineSafety} exact={true} />
            <Route path="/iprp" component={IprPolicy} exact={true} />
            <Route path="/iprp" component={IprPolicy} exact={true} />
            <Route
              path="/user/userprofile"
              component={AllUserProfile}
              exact={true}
            />
            <Route
              path="/searchringtone"
              component={SearchRingtone}
              exact={true}
            />
          </Switch>
        </Router>
        <ToastContainer position="top-center" autoClose={5000} />
      </Provider>
    </div>
  );
}

export default App;
