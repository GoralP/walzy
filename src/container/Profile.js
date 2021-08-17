import React, { useState, useEffect } from "react";
import { Main } from "../view";
import { AppBar, Tabs, Tab, Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { MdModeEdit } from "react-icons/md";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import forwardIcon from "../images/forward-icon.png";
import heartIcon from "../images/heart-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions";
import { IoPlay } from "react-icons/io5";

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

const Profile = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 0) {
      localStorage.setItem("typeWallpaper", "wallpaper");
      localStorage.removeItem("typeRingtone");
    } else {
      localStorage.setItem("typeRingtone", "ringtone");
      localStorage.removeItem("typeWallpaper");
    }
  };

  const { loading, profileData } = useSelector((state) => ({
    loading: state.profileReducers.profile.loading,
    profileData: state.profileReducers.profile.profileData,
  }));
  // console.log("chk", profileData);

  useEffect(() => {
    dispatch(getProfile());
    localStorage.removeItem("typeWallpaper");
    localStorage.removeItem("typeRingtone");
  }, [dispatch]);

  return (
    <div>
      <section>
        <Main />
      </section>
      <section id="profile">
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
            {loading ? (
              <div className="spin-center">
                <Spin />
              </div>
            ) : (
              profileData !== null && (
                <>
                  <div className="profile-user-name-block">
                    <div className="user-name">
                      @{profileData.name}
                      <br></br>
                      <span className="display-name">
                        {profileData.displayname}
                      </span>
                    </div>

                    <Link to="/editprofile">
                      <Button className="edit-btn">
                        <MdModeEdit />
                      </Button>
                    </Link>
                    <div className="row">
                      <div className="col-sm-5"></div>
                      <div className="col-sm-1">
                        <div className="up-down-number">
                          {profileData.total_upload_wallpaper}
                        </div>
                        <div className="up-down-text">Uploads</div>
                      </div>
                      <div className="col-sm-1">
                        <div className="up-down-number">
                          {profileData.total_download_wallpaper}
                        </div>
                        <div className="up-down-text">Downloads</div>
                      </div>
                      <div className="col-sm-5"></div>
                    </div>
                  </div>
                  <div className="image-uploaded-box">
                    <div className="row">
                      {profileData !== null &&
                        profileData.wallpaper.length == 0 && (
                          <center className="pt10per">
                            <h2>No Data Found</h2>
                          </center>
                        )}
                      {profileData.wallpaper.map((picture) => (
                        <div className="col-sm-2">
                          <img
                            src={picture.wallpaper_ringtone}
                            className="upload-photo"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )
            )}
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            className="container-fluid tabpanel-responsive"
          >
            {loading ? (
              <div className="spin-center">
                <Spin />
              </div>
            ) : (
              profileData !== null && (
                <>
                  <div className="profile-user-name-block">
                    <div className="user-name">
                      @{profileData.name} <br></br>
                      <span className="display-name">
                        {profileData.displayname}
                      </span>
                    </div>
                    <Link to="/editprofile">
                      <Button className="edit-btn">
                        <MdModeEdit />
                      </Button>
                    </Link>
                    <div className="row">
                      <div className="col-sm-5"></div>
                      <div className="col-sm-1">
                        <div className="up-down-number">
                          {profileData.total_upload_ringtone}
                        </div>
                        <div className="up-down-text">Uploads</div>
                      </div>
                      <div className="col-sm-1">
                        <div className="up-down-number">
                          {profileData.total_download_ringtone}
                        </div>
                        <div className="up-down-text">Downloads</div>
                      </div>
                      <div className="col-sm-5"></div>
                    </div>
                  </div>
                  <div className="image-uploaded-box">
                    <div className="row">
                      {profileData !== null &&
                        profileData.ringtone.length == 0 && (
                          <center className="pt10per">
                            <h2>No Data Found</h2>
                          </center>
                        )}
                      {profileData.ringtone.map((ring) => (
                        <>
                          <div className="col-sm-3 ringtone-block-1">
                            <div className="rington">
                              <div className="ringtone-name-block">
                                <div>
                                  <Button className="play-btn">
                                    <IoPlay />
                                  </Button>
                                </div>
                                <div className="ringtone-name-box">
                                  <div className="ringtone-name">
                                    {ring.title}
                                  </div>
                                </div>
                              </div>
                              <div className="download-second-number mt-1">
                                <div>
                                  <div className="ringtone-download-number">
                                    {ring.total_download}
                                  </div>
                                  <div>Downloads</div>
                                </div>
                                <div className="second-block">
                                  <div className="ringtone-download-number">
                                    30
                                  </div>
                                  <div>Seconds</div>
                                </div>
                              </div>
                              <div className="ringtone-tag">
                                {ring.tag.map((tagList) => (
                                  <Button className="tag-btn">
                                    {tagList.tag}
                                  </Button>
                                ))}
                              </div>
                              <div className="row mt-4">
                                <div className="col-5">
                                  <div className="row">
                                    <div className="col-3 ">
                                      <Button className="forward-btn ">
                                        <img
                                          src={forwardIcon}
                                          alt=""
                                          className="image-viewer-icon"
                                        />
                                      </Button>
                                    </div>
                                    <div className="col-9 heart-icon-block">
                                      <Button className="forward-btn ">
                                        <img
                                          src={heartIcon}
                                          alt=""
                                          className="image-viewer-icon"
                                        />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-7">
                                  <Button className="download-btn">
                                    Download Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </>
              )
            )}
          </TabPanel>
        </div>
      </section>
    </div>
  );
};

export default Profile;
