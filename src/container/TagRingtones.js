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

const TagRingtone = () => {
  const getToken = localStorage.getItem("token");
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [singleObj, setSingleRingtone] = useState({});
  const [modalFeedback, setModalFeedback] = useState(false);
  const [isFav, setFavorite] = useState(0);
  const [isFavList, setFavList] = useState(0);
  const [isPlaying, setPlayPause] = useState(false);
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
    localStorage.setItem("searchTagValue", "");
    let postId = window.location.href.split("ringtone/")[1];
    console.log("ck", postId);
    if (postId != "" && postId != null && postId != "undefined") {
      getRingtoneDetails(postId);
      setShow(true);
      localStorage.setItem("searchTagValue", postId);
      // localStorage.setItem("searchTagValue", "");
    } else {
      setShow(false);
      localStorage.setItem("searchTagValue", "");
      // localStorage.setItem("searchTagValue", "");
    }
  }, [dispatch]);

  const handleClick = (id) => {
    window.scrollTo(0, 0);
    getRingtoneDetails(id);
    setShow(true);
    history.push(`/ringtone/${id}`);
    localStorage.setItem("clickId", id);
  };

  const loadMore = () => {
    setVisible((prev) => prev + 12);
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
        setFavList(data.is_favorite);
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
    localStorage.setItem("searchTagValue", tag);
    dispatch(getAllRingtone());
    history.push(`/ringtone/${tag}`);
    console.log("hello");
    console.log(tag);
    setShow(false);
  };

  // const favUnfavoriteList = () => {
  //   dispatch(addFavoriteWallpaper());
  //   console.log("isFav", isFavList);
  //   if (isFavList == 1) {
  //     setFavList(0);
  //   } else {
  //     setFavList(1);
  //   }
  // };

  return (
    <div>
      <section>
        <Main />
      </section>

      <section id="rington">
        {show && (
          <>
            {loading ? (
              <div>loading...</div>
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
                        </div>
                      </div>
                      <div className="image-viewer-name-block mt-3">
                        <div>
                          <a
                            // href="empty"
                            // href={singleObj.wallpaper_ringtone}
                            // download={singleObj.wallpaper_ringtone}
                            onClick={() => dispatch(downloadRingtone())}
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
                            singleObj.tag.map((list) => (
                              <Button
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

        {/* {loading ? (
              <div>loading...</div>
            ) : ( */}
        {ringtoneData !== null && (
          <MultiPlayer
            urls={ringtoneData}
            visible={visible}
            handleClick={handleClick}
            ShareButton={ShareButton}
            forwardIcon={forwardIcon}
            singleObj={singleObj}
            getToken={getToken}
            addFavorite={addFavorite}
            // dispatch={dispatch}
            // addFavoriteWallpaper={addFavoriteWallpaper}
            history={history}
            BsFillHeartFill={BsFillHeartFill}
            heartIcon={heartIcon}
            handleClickTag={handleClickTag}
          />
        )}
        <div className="text-center">
          {visible && ringtoneData !== null && ringtoneData.length && (
            <Button onClick={loadMore} className="load-more-btn">
              Load More
            </Button>
          )}
        </div>
        {/* )} */}
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

export default TagRingtone;
