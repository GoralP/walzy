import React, { useState, useEffect } from "react";
import { Main } from "../view";
import forwardIcon from "../images/forward-icon.png";
import heartIcon from "../images/heart-icon.png";
import { Button } from "reactstrap";
import { IoPlay, IoPause } from "react-icons/io5";
import flagIcon from "../images/flag-icon.png";
import {
  getAllRingtone,
  downloadNow,
  addFavoriteWallpaper,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ShareButton from "react-web-share-button";
import { FeedbackModal } from "../modal";
import { Spin } from "antd";



const SearchRingtone = () => {
  const getToken = localStorage.getItem("token");
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [singleObj, setSingleRingtone] = useState({});
  const [modalFeedback, setModalFeedback] = useState(false);
  
  const [isPlaying, setPlayPause] = useState(false);

  const toggleFeedback = () => setModalFeedback(!modalFeedback);

  const dispatch = useDispatch();

  const { loading, ringtoneData } = useSelector((state) => ({
    loading: state.allWallpaperRingoneReducers.ringtone.loading,
    ringtoneData: state.allWallpaperRingoneReducers.ringtone.ringtoneData,
  }));

  useEffect(() => {
    dispatch(getAllRingtone());
    localStorage.setItem("searchValue", "");
  }, [dispatch]);

  const handleClick = (id) => {
    getRingtoneDetails(id);
    setShow(true);
    localStorage.setItem("clickId", id);
  };

  var getData = [];
  if (
    localStorage.getItem("ringtone_list") &&
    localStorage.getItem("ringtone_list") != null &&
    localStorage.getItem("ringtone_list") != "undefined"
  ) {
    getData = JSON.parse(localStorage.getItem("ringtone_list"));
  }

  const getRingtoneDetails = (getId) => {
    getData.forEach((data) => {
      if (data.id == getId) {
        PauseAudio();
        setSingleRingtone(data);
      }
    });
  };

  const PlayAudio = (url) => {
    setPlayPause(true);
    let audioFile = new Audio(url);
    audioFile.play();
  };
  
  const PauseAudio = (url) => {
    setPlayPause(false);
    let audioFile = new Audio(url);
    audioFile.pause();
  };

  return (
    <div>
      <section>
        <Main />
      </section>

      <section id="rington">
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
                          <span className="image-user-name">
                            @{singleObj.user_name}
                          </span>
                          <br></br>{" "}
                          <span className="image-viewer-name">
                            {singleObj.title}
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
                            className="image-viewer-btn"
                            onClick={() => {
                              getToken
                                ? dispatch(addFavoriteWallpaper())
                                : history.push("/login");
                            }}
                          >
                            <img
                              src={heartIcon}
                              alt=""
                              className="image-viewer-icon"
                            />
                          </Button>
                          <Button
                            className="image-viewer-btn"
                            onClick={() => {
                              getToken
                                ? toggleFeedback()
                                : history.push("/login");
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
                          <Button className="image-viewer-play-btn">
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
                          </Button>
                        </div>
                      </div>
                      <div className="image-viewer-name-block mt-3">
                        <div>
                          <a
                            onClick={() =>
                              getToken
                                ? dispatch(downloadNow())
                                : history.push("/login")
                            }
                          >
                            <Button className="download-btn">
                              Download Now
                            </Button>
                          </a>
                        </div>
                        <div className="text-center">
                          <span className="image-viewer-download-number">
                            {singleObj.total_download}
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
                          {singleObj.tag.map((list) => (
                            <Button className="image-viewer-tag-btn">
                              {list.tag}
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
              <div>loading...</div>
            ) : (
              ringtoneData !== null &&
              ringtoneData.map((item) => (
                <div className="col-sm-3 ringtone-block-1 ">
                  <div
                    className="rington"
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    <div className="ringtone-name-block">
                      <div>
                        <Button className="play-btn">
                          <IoPlay />
                        </Button>
                      </div>
                      <div className="ringtone-name-box">
                        <div className="ringtone-name">{item.title}</div>
                      </div>
                    </div>
                    <div className="download-second-number mt-1">
                      <div>
                        <div className="ringtone-download-number">
                          {item.total_download}
                        </div>
                        <div>Downloads</div>
                      </div>
                      <div className="second-block">
                        <div className="ringtone-download-number">30</div>
                        <div>Seconds</div>
                      </div>
                    </div>
                    <div className="ringtone-tag">
                      {item.tag.map((list) => (
                        <Button className="tag-btn">{list.tag}</Button>
                      ))}
                    </div>
                    <div className="row mt-4">
                      <div className="col-5">
                        <div className="row">
                          <div className="col-3 ">
                            <Button className="forward-btn ">
                              <img src={forwardIcon} alt="" />
                            </Button>
                          </div>
                          <div className="col-9 heart-icon-block">
                            <Button
                              className="forward-btn"
                              onClick={() => {
                                getToken
                                  ? dispatch(addFavoriteWallpaper())
                                  : history.push("/login");
                              }}
                            >
                              <img src={heartIcon} alt="" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="col-7">
                        <Button className="download-btn">Download Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
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

export default SearchRingtone;
