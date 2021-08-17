import React, { useState, useEffect } from "react";
import { Main } from "../view";
import { AppBar, Tabs, Tab, Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { Ringtone, Wallpaper } from "../container";
import Terms from "./Terms";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function activeTab(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Home = () => {
  const styles = {
    usericon: {
      display: "block",
    },
  };

  const [icon, setIcon] = useState(true);
  const [show, setShow] = useState(false);
  const [mainsrc, setMainsrc] = useState(true);
  const [showRingtone, setShowRingtone] = useState(false);
  const [value, setValue] = useState(0);

  const setImage = (e) => {
    var imgsrc = e.target.src;
    setMainsrc(imgsrc);
    setShow(true);
  };

  useEffect(() => {
    var pagename = window.location.pathname;
    if (pagename != "/" && pagename != "/walzy/" && pagename != "") {
      localStorage.removeItem("typeWallpaper");
      localStorage.removeItem("typeRingtone");
    }

    const query = new URLSearchParams(window.location.search);
    const searchparamValue = query.get("search");
    console.log("searchparamValue", searchparamValue);
    console.log("query", query);
    if (
      searchparamValue != "" &&
      searchparamValue != null &&
      searchparamValue != "undefined"
    ) {
      localStorage.setItem("searchValue", searchparamValue);
    } else {
      localStorage.setItem("searchValue", "");
      let postId = window.location.href.split("/")[4];
      if (postId == "wallpaper") {
        postId = window.location.href.split("/")[5];
      }
      if (
        postId != "" &&
        postId != null &&
        postId != "undefined" &&
        postId != 0
      ) {
        localStorage.setItem("clickId", postId);
      } else {
        localStorage.setItem("clickId", "");
      }
    }

    let activeIndex = localStorage.getItem("active_tab_index");
    if (
      activeIndex != "undefined" &&
      activeIndex != "" &&
      activeIndex != null
    ) {
      activeTab(parseInt(activeIndex));
      setValue(parseInt(activeIndex));
    }
  }, []);

  const setRingtone = () => {
    setShowRingtone(true);
    console.log("hii");
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
    localStorage.setItem("active_tab_index", newValue);
    if (newValue == 0) {
      localStorage.setItem("typeWallpaper", "wallpaper");
      localStorage.removeItem("typeRingtone");
    } else {
      localStorage.setItem("typeRingtone", "ringtone");
      localStorage.removeItem("typeWallpaper");
    }
  };
  return (
    <div>
      <section id="home-topbar">
        <Main />
      </section>

      <div>
        <AppBar
          position="static"
          className="appbar-border "
          elevation={0}
          className="profile-section"
        >
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Wallpapers" {...activeTab(0)} />
            <Tab label="Ringtones" {...activeTab(1)} />
          </Tabs>
        </AppBar>
        <TabPanel
          value={value}
          index={0}
          className="container-fluid tabpanel-responsive"
        >
          <div className="home-wallpaper">
            <Wallpaper />
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          className="container-fluid tabpanel-responsive"
        >
          <div className="home-ringtone">
            <Ringtone />
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default Home;
