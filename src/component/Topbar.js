import React, { Component } from "react";
import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import searchIcon from "../images/search_icon.png";
import homeHeartIcon from "../images/home-heart-icon.png";
import homeUserIcon from "../images/home-user-icon.png";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Router, useLocation } from "react-router-dom";
import { Wallpaper } from "../container";
import { searchWallpaper } from "../redux/actions";
import axios from "axios";
import { config } from "../common";
import { Button } from "reactstrap";
import { GrSearchAdvanced } from "react-icons/gr";
import { withRouter } from "react-router";
import logo from "../images/logo.png";

const styles = (theme) => ({
  flexGrow: {
    flexGrow: 1,
  },
  nav__link_decoration: {
    textDecoration: "none",
  },
  nav__title_color: {
    color: "#050748",
    fontWeight: "bold",
    fontSize: "30px",
    textAlign: "center",
    textDecoration: "none",
  },

  searchbox: {
    background: "white",
    borderRadius: "25px",
    border: "1px solid #707070",
    width: "420px",
    paddingTop: "0.7rem",
    paddingBottom: "0.6rem",
    paddingLeft: "3rem",

    "&::placeholder": {
      color: "#6A6A8E",
      fontWeight: "600",
    },
  },
});

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWallpaperData: [],
      loading: true,
      show: false,
    };

    this.getData = localStorage.getItem("searchValue");
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onHome = this.onHome.bind(this);
  }

  handleChange = (e) => {
    localStorage.setItem("searchValue", e.target.value);
  };

  onHome = () => {
    localStorage.removeItem("searchValue");
    localStorage.removeItem("searchparamValue");
    localStorage.removeItem("typeWallpaper");
    localStorage.removeItem("typeRingtone");
    localStorage.removeItem("active_tab_index");
    this.props.history.push("/");
    window.location.reload();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const typeData = localStorage.getItem("typeWallpaper");
    const typeRingtone = localStorage.getItem("typeRingtone");
    const searchItem = localStorage.getItem("searchValue");
   
    if (typeData) {
      this.loadSearchWallpaper(this.getData);
      localStorage.setItem("tabRingtone", "");
    } else if (typeRingtone) {
      this.loadSearchRingtone(this.getData);
      console.log("ringtone");
    }
  };

  loadSearchWallpaper() {
    const formData = new FormData();
    var searchData = localStorage.getItem("searchValue");
    formData.append("search", searchData);
    // formData.append("type", "wallpaper");
    axios
      .post(`${config.apiUrl}/AllWallpaper`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })

      .then((response) => {
        this.setState({
          searchWallpaperData: response.data.Result,
          loading: false,
        });
        this.props.history.push("/search");
      })
      .catch((error) => console.log(error));
  }

  loadSearchRingtone() {
    const formData = new FormData();
    var searchData = localStorage.getItem("searchValue");
    formData.append("search", searchData);
    // formData.append("type", "wallpaper");
    axios
      .post(`${config.apiUrl}/AllRingtone`, formData, {
        headers: {
          key: "69d5eb2052ac7712cf5e4b40famz3152",
        },
      })

      .then((response) => {
        this.setState({
          searchWallpaperData: response.data.Result,
          loading: false,
        });
        this.props.history.push("/searchringtone");
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { classes, onSidebarOpen, ...rest } = this.props;
    const { searchWallpaperData, loading, show } = this.state;
    var isHomePage = localStorage.getItem("isHomePage");
    var getToken = localStorage.getItem("token");

    return (
      <>
        <AppBar {...rest} className={classes.root}>
          <Container>
            <Toolbar>
              <div>
                <img
                  src={logo}
                  alt=""
                  className="walzy-logo"
                  onClick={this.onHome}
                />
              </div>
              <div className="search_block">
                <form
                  className="search-form"
                  onSubmit={() => this.handleSubmit}
                >
                  <Button className="search_icon">
                    <img src={searchIcon} alt="" className="search-icon-img" />
                  </Button>

                  <input
                    type="text"
                    autoComplete="off"
                    placeholder={
                      localStorage.getItem("typeRingtone")
                        ? "Search Ringtones"
                        : "Search Wallpapers"
                    }
                    className="searchbox"
                    name="search"
                    onChange={this.handleChange}
                  />
                </form>
              </div>
              <div className={classes.flexGrow} />
              {getToken ? (
                <Link
                  to="/favorites"
                  className={
                    isHomePage == "true" ? "home-icon-show" : "home-icon-hide"
                  }
                >
                  <Hidden mdDown>
                    <IconButton color="inherit">
                      <HiOutlineHeart
                        className={
                          isHomePage == "true"
                            ? "home-icon-show"
                            : "home-icon-hide"
                        }
                      />
                    </IconButton>
                  </Hidden>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={
                    isHomePage == "true" ? "home-icon-show" : "home-icon-hide"
                  }
                >
                  <Hidden mdDown>
                    <IconButton color="inherit">
                      <HiOutlineHeart
                        className={
                          isHomePage == "true"
                            ? "home-icon-show"
                            : "home-icon-hide"
                        }
                      />
                    </IconButton>
                  </Hidden>
                </Link>
              )}

              {getToken ? (
                <Link
                  to="/profile"
                  className={
                    isHomePage == "true" ? "home-icon-show" : "home-icon-hide"
                  }
                >
                  <Hidden mdDown>
                    <IconButton color="inherit">
                      <HiOutlineUser
                        className={
                          isHomePage == "true"
                            ? "home-icon-show"
                            : "home-icon-hide"
                        }
                      />
                    </IconButton>
                  </Hidden>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={
                    isHomePage == "true" ? "home-icon-show" : "home-icon-hide"
                  }
                >
                  <Hidden mdDown>
                    <IconButton color="inherit">
                      <HiOutlineUser
                        className={
                          isHomePage == "true"
                            ? "home-icon-show"
                            : "home-icon-hide"
                        }
                      />
                    </IconButton>
                  </Hidden>
                </Link>
              )}

              <Hidden mdDown>
                <IconButton color="inherit" onClick={onSidebarOpen}>
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Hidden lgUp>
                <IconButton color="inherit" onClick={onSidebarOpen}>
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>
        {/* {show &&
          searchWallpaperData &&
          searchWallpaperData.map((list) => <div>{list.title}</div>)} */}
      </>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default withRouter(withStyles(styles)(Topbar));
