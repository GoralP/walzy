import React, { Component } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import wallpaperIcon from "../images/wallpaper_icon.png";
import favoriteIcon from "../images/favorite_icon.png";
import ringtoneIcon from "../images/ringtone_icon.png";
import privacyIcon from "../images/privacy_icon.png";
import profileIcon from "../images/profile_icon.png";
import cookiePolicy from "../images/cookie_policy.png";
import intellectual from "../images/intellectual.png";
import infringement from "../images/infringement.png";
import onlineSafety from "../images/Online_safety.png";
import serviceIcon from "../images/service_icon.png";
import uploadIcon from "../images/upload_icon.png";
import logoutIcon from "../images/logout_icon.png";
import loginIcon from "../images/log-in.png";
import signupIcon from "../images/sing-uip.png";
import { Link } from "react-router-dom";
import closeIcon from "../images/close_icon.png";
import arrowIcon from "../images/arrow-icon.png";
import { toast } from "react-toastify";
import { withRouter } from "react-router";
import { BiCookie } from "react-icons/bi";

const styles = {
  fullList: {
    width: 300,
  },
  menu_icon: {
    height: "50px",
    width: "50px",
  },
};

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSidebar: false,
    };
    this.logout = this.logout.bind(this);
  }

  showDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ openSidebar: true });
  };

  logout = () => {
    localStorage.clear("getToken");
    toast.success("Logout Successfully");
    this.props.history.push("/");
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("Sidebar state: " + this.state.openSidebar);
  // }

  fullList = () => {
    const getToken = localStorage.getItem("token");
    // const history = useHistory();

    const { classes, onClose } = this.props;
    return (
      <div
        className={classes.fullList}
        role="presentation"
        onClick={onClose}
        // onKeyDown={onClose}
      >
        <List>
          <div className="close-icon-block">
            <img src={closeIcon} alt="" className="close-icon" />
          </div>

          <>
            {getToken ? (
              <>
                <ListItem button onClick={this.logout}>
                  <ListItemIcon>
                    <img
                      src={logoutIcon}
                      alt=""
                      className={classes.menu_icon}
                    />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                  <ListItemText>
                    <img src={arrowIcon} alt="" className="arrow-icon" />
                  </ListItemText>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to={"/login"}>
                  <img src={loginIcon} alt="" className={classes.menu_icon} />
                  <ListItemText className="mr-5">Login</ListItemText>
                  <ListItemText>
                    <img src={arrowIcon} alt="" className="arrow-icon" />
                  </ListItemText>
                </ListItem>
              </>
            )}
          </>

          {/* <>
            {getToken ? (
              ""
            ) : (
              <ListItem button component={Link} to={"/signup"}>
                <img src={signupIcon} alt="" className={classes.menu_icon} />
                <ListItemText>Sign Up</ListItemText>
                <ListItemText className="arrow-icon">
                  <img src={arrowIcon} alt="" />
                </ListItemText>
              </ListItem>
            )}
          </> */}

          <ListItem
            button
            component={Link}
            to={"/wallpaper"}
            onClick={() => {
              localStorage.setItem("typeWallpaper", "wallpaper");
              localStorage.setItem("typeRingtone", "");
            }}
          >
            <ListItemIcon>
              <img src={wallpaperIcon} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Wallpapers</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to={"/ringtone"}
            onClick={() => {
              localStorage.setItem("typeRingtone", "Ringtone");
              localStorage.setItem("typeWallpaper", "");
            }}
          >
            <ListItemIcon>
              <img src={ringtoneIcon} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Ringtones</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to={getToken ? "/upload" : "/login"}
          >
            <ListItemIcon>
              <img src={uploadIcon} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Upload</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>

          <>
            {getToken ? (
              <ListItem button component={Link} to={"/favorites"}>
                <ListItemIcon>
                  <img
                    src={favoriteIcon}
                    alt=""
                    className={classes.menu_icon}
                  />
                </ListItemIcon>
                <ListItemText>Favorites</ListItemText>
                <ListItemText className="arrow-icon">
                  <img src={arrowIcon} alt="" />
                </ListItemText>
              </ListItem>
            ) : (
              ""
            )}
          </>

          <>
            {getToken ? (
              <ListItem button component={Link} to={"/profile"}>
                <ListItemIcon>
                  <img src={profileIcon} alt="" className={classes.menu_icon} />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
                <ListItemText className="arrow-icon">
                  <img src={arrowIcon} alt="" />
                </ListItemText>
              </ListItem>
            ) : (
              ""
            )}
          </>

          <ListItem button component={Link} to={"/terms"}>
            <ListItemIcon>
              <img src={serviceIcon} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Terms of service</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>
          <ListItem button component={Link} to={"/privacy"}>
            <ListItemIcon>
              <img src={privacyIcon} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Privacy policy</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>

          <ListItem button component={Link} to={"/cookie"}>
            <ListItemIcon>
              <img src={cookiePolicy} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Cookie Policy</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>

          <ListItem button component={Link} to={"/onlinesafety"}>
            <ListItemIcon>
              <img src={onlineSafety} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Online Safety</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>

          <ListItem button component={Link} to={"/iprp"}>
            <ListItemIcon>
              <img src={intellectual} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Intellectual Property Rights Policy</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>
          <ListItem button component={Link} to={"/itp"}>
            <ListItemIcon>
              <img src={infringement} alt="" className={classes.menu_icon} />
            </ListItemIcon>
            <ListItemText>Infringement / Takedown Policy</ListItemText>
            <ListItemText className="arrow-icon">
              <img src={arrowIcon} alt="" />
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  };

  render() {
    const { open, onOpen, onClose } = this.props;

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <SwipeableDrawer
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        anchor="right"
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        {this.fullList()}
      </SwipeableDrawer>
    );
  }
}

export default withRouter(withStyles(styles)(Sidebar));
