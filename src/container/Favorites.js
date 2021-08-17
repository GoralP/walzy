import React, { useState, useEffect } from "react";
import { Main } from "../view";
import { AppBar, Tabs, Tab, Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { IoPlay, IoPause } from "react-icons/io5";
import forwardIcon from "../images/forward-icon.png";
import heartIcon from "../images/heart-icon.png";
import flagIcon from "../images/flag-icon.png";
import {
  favoriteWallpaper,
  addFavoriteWallpaper,
  downloadNow,
  downloadRingtone,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ShareButton from "react-web-share-button";
import { FeedbackModal } from "../modal";
import { BsFillHeartFill } from "react-icons/bs";
import MultiFavoritePlayer from "./MultiFavoritePlayer";
import { useHistory } from "react-router";
import Player from "./Player";
import { Spin } from "antd";

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

const Favorites = () => {
  const getToken = localStorage.getItem("token");
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
    // window.location.reload();
  };
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showRingtone, setShowRingtone] = useState(false);
  const [singleObj, setSingleWallpaper] = useState({});
  const [singleRingtone, setSingleRingtone] = useState({});
  const [modalFeedback, setModalFeedback] = useState(false);
  const [isFav, setFavorite] = useState(0);
  const [visible, setVisible] = useState(12);

  const toggleFeedback = () => setModalFeedback(!modalFeedback);

  const { loading, getFavoriteData } = useSelector((state) => ({
    loading: state.favoriteReducers.getFavorite.loading,
    getFavoriteData: state.favoriteReducers.getFavorite.getFavoriteData,
  }));

  const history = useHistory();

  const loadMore = () => {
    setVisible((prev) => prev + 12);
    console.log(visible);
  };

  const handleClick = (id) => {
    window.scrollTo(0, 0);
    getWallpaperDetails(id);
    setShow(true);
    localStorage.setItem("clickedId", id);
  };

  var getData = [];
  if (
    localStorage.getItem("fav_wallpaper_list") &&
    localStorage.getItem("fav_wallpaper_list") != null &&
    localStorage.getItem("fav_wallpaper_list") != "undefined"
  ) {
    getData = JSON.parse(localStorage.getItem("fav_wallpaper_list"));
  }

  const getWallpaperDetails = (getId) => {
    getData.forEach((data) => {
      if (data.id == getId) {
        setSingleWallpaper(data);
        console.log("singleObj", singleObj);
        setFavorite(data.is_favorite);
      }
    });
  };

  const addFavorite = (id) => {
    localStorage.setItem("clickedId", id);
    dispatch(addFavoriteWallpaper());
  };

  var getDataRingtone = [];
  if (
    localStorage.getItem("fav_Ringtone_list") &&
    localStorage.getItem("fav_Ringtone_list") != null &&
    localStorage.getItem("fav_Ringtone_list") != "undefined"
  ) {
    getDataRingtone = JSON.parse(localStorage.getItem("fav_Ringtone_list"));
  }

  const handleClickTag = (tag) => {
    localStorage.setItem("searchTagValue", tag);
    history.push(`/wallpaper/0/${tag}`);
  };

  const handleClickTagDetail = (id, tag) => {
    localStorage.setItem("searchTagRingtone", tag);
    history.push(`/ringtone/0/${tag}`);
  };

  const handleClickRingtone = (id) => {
    getRingtoneDetails(id);
    setShowRingtone(true);
    localStorage.setItem("clickedId", id);
  };

  const getRingtoneDetails = (getId) => {
    getDataRingtone.forEach((data) => {
      if (data.id == getId) {
        setSingleRingtone(data);
        setFavorite(data.is_favorite);
      }
    });
  };

  useEffect(() => {
    dispatch(favoriteWallpaper());
    localStorage.removeItem("typeWallpaper");
    localStorage.removeItem("typeRingtone");
  }, [dispatch]);

  const favUnfavorite = () => {
    dispatch(addFavoriteWallpaper());
    console.log("isFav", isFav);
    if (isFav == 1) {
      setFavorite(0);
    } else {
      setFavorite(1);
    }
  };

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
            <>
              {getFavoriteData !== null &&
                getFavoriteData.wallpaper.length == 0 && (
                  <center className="pt10per">
                    <h2>No Data Found</h2>
                  </center>
                )}

              {show && (
                <>
                  {loading ? (
                    <div className="spin-center">
                      <Spin />
                    </div>
                  ) : (
                    singleObj !== null && (
                      <>
                        <section className="image-viewer-box">
                          <div className="image-viewer-inner">
                            <div className="image-viewer-name-block">
                              <div>
                                <span className="image-viewer-name">
                                  {singleObj.title}
                                </span>
                                <br></br>
                                <span className="image-user-name">
                                  @{singleObj.user_name}
                                </span>
                              </div>
                              <div>
                                {/* <Button className="image-viewer-btn ">
                                  <img
                                    src={forwardIcon}
                                    alt=""
                                    className="image-viewer-icon"
                                  />
                                </Button> */}
                                <ShareButton
                                  buttonText={
                                    <img
                                      src={forwardIcon}
                                      alt=""
                                      style={{ color: "black" }}
                                      className="image-viewer-icon"
                                    />
                                  }
                                  buttonStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                    border: "1px solid #FF3C8C",
                                    padding: "7px 11px",
                                  }}
                                  title={`${singleObj.title} - Walzy`}
                                />
                                <Button
                                  className="image-viewer-btn "
                                  onClick={() => favUnfavorite()}
                                >
                                  {/* <img
                                    src={heartIcon}
                                    alt=""
                                    className="image-viewer-icon"
                                  /> */}
                                  {isFav == 1 ? (
                                    <BsFillHeartFill />
                                  ) : (
                                    <img
                                      src={heartIcon}
                                      alt=""
                                      className="image-viewer-icon"
                                    />
                                  )}
                                </Button>
                                <Button
                                  className="image-viewer-btn"
                                  onClick={() => {
                                    toggleFeedback();
                                  }}
                                >
                                  <img
                                    src={flagIcon}
                                    alt=""
                                    className="image-viewer-icon"
                                  />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4">
                              <img
                                src={singleObj.wallpaper_ringtone}
                                className="image-viewer-selected-image"
                              />
                            </div>
                            <div className="image-viewer-name-block mt-3">
                              <div>
                                <a onClick={() => dispatch(downloadNow())}>
                                  <Button className="download-btn">
                                    Download Now
                                  </Button>
                                </a>
                              </div>
                              <div className="text-center">
                                <span className="image-viewer-download-number">
                                  139
                                </span>
                                <br></br>
                                <span className="image-viewer-download-text">
                                  Downloads
                                </span>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section className="image-viewer-tag-box">
                          <div className="image-viewer-inner">
                            <div className="image-viewer-tag">
                              <div>
                                {singleObj.tag.map((item, m) => (
                                  <Button
                                    key={m}
                                    className="image-viewer-tag-btn"
                                    onClick={() => handleClickTag(item.tag)}
                                  >
                                    {item.tag}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </section>
                      </>
                    )
                  )}
                </>
              )}

              <div className="image-uploaded-box">
                <div className="row">
                  {loading ? (
                    <div className="spin-center">
                      <Spin />
                    </div>
                  ) : (
                    getFavoriteData !== null &&
                    getFavoriteData.wallpaper.map((list, m) => (
                      <div className="col-sm-2" key={m}>
                        <img
                          src={list.wallpaper_ringtone}
                          className="upload-photo"
                          onClick={() => {
                            handleClick(list.id);
                          }}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            className="container-fluid tabpanel-responsive"
          >
            <>
              {getFavoriteData !== null &&
                getFavoriteData.ringtone.length == 0 && (
                  <center className="pt10per">
                    <h2>No Data Found</h2>
                  </center>
                )}
              {showRingtone && (
                <>
                  {loading ? (
                    <div className="spin-center">
                      <Spin />
                    </div>
                  ) : (
                    singleRingtone !== null && (
                      <>
                        <section className="image-viewer-box">
                          <div className="image-viewer-inner">
                            <div className="image-viewer-name-block">
                              <div>
                                <span className="image-user-name">
                                  @{singleRingtone.user_name}
                                </span>
                                <br></br>
                                <span className="image-viewer-name">
                                  {singleRingtone.title}
                                </span>
                              </div>
                              <div>
                                {/* <Button className="image-viewer-btn ">
                                  <img
                                    src={forwardIcon}
                                    alt=""
                                    className="image-viewer-icon"
                                  />
                                </Button> */}
                                <ShareButton
                                  buttonText={
                                    <img
                                      src={forwardIcon}
                                      alt=""
                                      style={{ color: "black" }}
                                      className="image-viewer-icon"
                                    />
                                  }
                                  buttonStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                    border: "1px solid #FF3C8C",
                                    padding: "7px 11px",
                                  }}
                                  title={`${singleRingtone.title} - Walzy`}
                                />
                                <Button
                                  className="image-viewer-btn"
                                  onClick={() => favUnfavorite()}
                                >
                                  {/* <img
                                    src={heartIcon}
                                    alt=""
                                    className="image-viewer-icon"
                                  /> */}

                                  {isFav == 1 ? (
                                    <img
                                      src={heartIcon}
                                      alt=""
                                      className="image-viewer-icon"
                                    />
                                  ) : (
                                    <BsFillHeartFill />
                                  )}

                                  {/* <BsFillHeartFill /> */}
                                </Button>
                                <Button
                                  className="image-viewer-btn"
                                  onClick={() => {
                                    toggleFeedback();
                                  }}
                                >
                                  <img
                                    src={flagIcon}
                                    alt=""
                                    className="image-viewer-icon"
                                  />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="text-center">
                                {/* <Button className="image-viewer-play-btn">
                                  {isPlaying ? (
                                    <IoPause
                                      onClick={() =>
                                        PauseAudio(singleObj.wallpaper_ringtone)
                                      }
                                    />
                                  ) : (
                                    <IoPlay
                                      onClick={() =>
                                        PlayAudio(singleObj.wallpaper_ringtone)
                                      }
                                    />
                                  )}
                                </Button> */}
                                <Player
                                  url={singleRingtone.wallpaper_ringtone}
                                  isSingle="true"
                                  songid={singleRingtone.id}
                                />
                              </div>
                            </div>
                            <div className="image-viewer-name-block mt-3">
                              <div>
                                <a onClick={() => dispatch(downloadRingtone())}>
                                  <Button className="download-btn">
                                    Download Now
                                  </Button>
                                </a>
                              </div>
                              <div className="text-center">
                                <span className="image-viewer-download-number">
                                  {singleRingtone.total_download}
                                </span>
                                <br></br>
                                <span className="image-viewer-download-text">
                                  Downloads
                                </span>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section className="image-viewer-tag-box">
                          <div className="image-viewer-inner">
                            <div className="image-viewer-tag">
                              <div>
                                {singleRingtone.tag.map((item, m) => (
                                  <Button
                                    key={m}
                                    className="image-viewer-tag-btn"
                                    onClick={() => handleClickTag(item.tag)}
                                  >
                                    {item.tag}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </section>
                      </>
                    )
                  )}
                </>
              )}
              {loading ? (
                <div className="spin-center">
                  <Spin />
                </div>
              ) : (
                getFavoriteData !== null && (
                  <MultiFavoritePlayer
                    urls={getFavoriteData}
                    visible={visible}
                    handleClickRingtone={handleClickRingtone}
                    ShareButton={ShareButton}
                    forwardIcon={forwardIcon}
                    getToken={getToken}
                    addFavorite={addFavorite}
                    history={history}
                    BsFillHeartFill={BsFillHeartFill}
                    heartIcon={heartIcon}
                    loadMore={loadMore}
                    handleClickTagDetail={handleClickTagDetail}
                  />
                )
              )}
            </>
          </TabPanel>
        </div>
      </section>
      {modalFeedback && (
        <FeedbackModal
          modalFeedback={modalFeedback}
          setModalFeedback={setModalFeedback}
          toggleFeedback={toggleFeedback}
        />
      )}
    </div>
  );
};

export default Favorites;
