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
  downloadRingtone,
  addFavoriteWallpaper,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ShareButton from "react-web-share-button";
import { FeedbackModal } from "../modal";
import { BsFillHeartFill } from "react-icons/bs";
import Player from "./Player";
import MultiPlayer from "./MultiPlayer";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const Ringtone = () => {
  const getToken = localStorage.getItem("token");
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [singleObj, setSingleRingtone] = useState({});
  const [modalFeedback, setModalFeedback] = useState(false);
  const [isFav, setFavorite] = useState(0);
  const [locationKeys, setLocationKeys] = useState([]);

  const [visible, setVisible] = useState(12);

  const toggleFeedback = () => setModalFeedback(!modalFeedback);

  const dispatch = useDispatch();

  const { loading, ringtoneData } = useSelector((state) => ({
    loading: state.allWallpaperRingoneReducers.ringtone.loading,
    ringtoneData: state.allWallpaperRingoneReducers.ringtone.ringtoneData,
  }));

  useEffect(() => {
    dispatch(getAllRingtone());
    localStorage.setItem("searchValue", "");
    localStorage.setItem("searchTagRingtone", "");
    const query = new URLSearchParams(window.location.search);
    const searchparamValue = query.get("search");
    console.log("searchparamValue", searchparamValue);
    if (
      searchparamValue != "" &&
      searchparamValue != null &&
      searchparamValue != "undefined"
    ) {
      localStorage.setItem("searchValue", searchparamValue);
    } else {
      let postId = window.location.href.split("/")[4];
      let tagValue = window.location.href.split("/")[5];
      console.log(window.location.href.split("/"));
      if (postId == "ringtone") {
        postId = window.location.href.split("/")[5];
        tagValue = window.location.href.split("/")[6];
      }
      if (
        postId != "" &&
        postId != null &&
        postId != "undefined" &&
        postId != 0
      ) {
        setShow(true);
        getRingtoneDetails(postId);
        localStorage.setItem("clickId_ringone", postId);
      } else {
        setShow(false);
        localStorage.setItem("clickId_ringone", "");
      }

      if (tagValue != "" && tagValue != null && tagValue != "undefined") {
        localStorage.setItem("searchTagRingtone", tagValue);
        setShow(false);
      }

      return history.listen((location) => {
        if (history.action === "PUSH") {
          setLocationKeys([location.key]);
        }

        if (history.action === "POP") {
          if (locationKeys[1] === location.key) {
            setLocationKeys(([_, ...keys]) => keys);
          } else {
            setLocationKeys((keys) => [location.key, ...keys]);
          }
        }
      });
    }
  }, [dispatch, locationKeys]);

  const handleClick = (id, user_id) => {
    window.scrollTo(0, 0);
    getRingtoneDetails(id);
    setShow(true);
    history.push(`/ringtone/${id}`);
    localStorage.setItem("clickedId", id);
    console.log("ringtoneid", id);
    localStorage.setItem("wallpaper_user_id", user_id);
  };

  const loadMore = () => {
    setVisible((prev) => prev + 24);
    console.log(visible);
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
        setSingleRingtone(data);
        setFavorite(data.is_favorite);
      }
    });
  };

  const addFavorite = (id) => {
    localStorage.setItem("clickedId", id);
    dispatch(addFavoriteWallpaper());
  };

  const favUnfavorite = () => {
    dispatch(addFavoriteWallpaper());
    console.log("isFav", isFav);
    if (isFav == 1) {
      setFavorite(0);
    } else {
      setFavorite(1);
    }
  };

  const handleClickTag = (tag) => {
    localStorage.setItem("searchTagRingtone", tag);
    dispatch(getAllRingtone());
    var toneID = localStorage.getItem("clickId_ringone");
    if (toneID == "") {
      toneID = 0;
    }
    history.push(`/ringtone/${toneID}/${tag}`);

    setShow(false);
  };

  const handleClickTagDetail = (id, tag) => {
    localStorage.setItem("clickTagId", id);
    localStorage.setItem("searchTagRingtone", tag);
    dispatch(getAllRingtone());
    var toneID = localStorage.getItem("clickTagId");
    if (toneID == "") {
      toneID = 0;
    }
    history.push(`/ringtone/${toneID}/${tag}`);

    setShow(false);
    console.log("show", show);
  };

  return (
    <div>
      <section>
        <Main />
      </section>

      <section id="rington">
        {ringtoneData !== null && ringtoneData.length == 0 && (
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
                          <span className="image-user-name">
                            <Link
                              to="/user/userprofile"
                              className="image-user-name"
                            >
                              @{singleObj.user_name}
                            </Link>
                          </span>
                          <br></br>{" "}
                          <span className="image-viewer-name">
                            {singleObj.title}
                          </span>
                        </div>
                        <div>
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
                                ? favUnfavorite()
                                : history.push("/login");
                            }}
                          >
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
                            onClick={() => toggleFeedback()}
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
                          <Player
                            url={singleObj.wallpaper_ringtone}
                            isSingle="true"
                            songid={singleObj.id}
                          />
                        </div>
                      </div>
                      <div className="image-viewer-name-block mt-3">
                        <div>
                          <a
                            onClick={() => dispatch(downloadRingtone(history))}
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
                          {singleObj.tag &&
                            singleObj.tag.map((list, m) => (
                              <Button
                                key={m}
                                className="image-viewer-tag-btn"
                                onClick={() => handleClickTag(list.tag)}
                              >
                                {list.tag} Ringtones
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
          ringtoneData !== null && (
            <MultiPlayer
              urls={ringtoneData}
              visible={visible}
              handleClick={handleClick}
              ShareButton={ShareButton}
              forwardIcon={forwardIcon}
              getToken={getToken}
              addFavorite={addFavorite}
              // dispatch={dispatch}
              // addFavoriteWallpaper={addFavoriteWallpaper}
              history={history}
              BsFillHeartFill={BsFillHeartFill}
              heartIcon={heartIcon}
              loadMore={loadMore}
              handleClickTagDetail={handleClickTagDetail}
            />
          )
        )}
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

export default Ringtone;
