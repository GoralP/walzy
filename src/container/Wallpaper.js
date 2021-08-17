import React, { useState, useEffect } from "react";
import { Main } from "../view";
import { Button } from "reactstrap";
import forwardIcon from "../images/forward-icon.png";
import heartIcon from "../images/heart-icon.png";
import flagIcon from "../images/flag-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWallpaper,
  downloadNow,
  addFavoriteWallpaper,
  getTagWallpaper,
} from "../redux/actions";
import ShareButton from "react-web-share-button";
import { useHistory } from "react-router";
import { FeedbackModal } from "../modal";
import { BsFillHeartFill } from "react-icons/bs";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const Wallpaper = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [singleObj, setSingleWallpaper] = useState({});
  const [isFav, setFavorite] = useState(0);
  const [modalFeedback, setModalFeedback] = useState(false);
  const [visible, setVisible] = useState(12);
  const [locationKeys, setLocationKeys] = useState([]);

  const loadMore = () => {
    setVisible((prev) => prev + 24);
    // console.log(visible);
  };

  const toggleFeedback = () => setModalFeedback(!modalFeedback);

  const dispatch = useDispatch();

  const getToken = localStorage.getItem("token");

  const { loading, wallpaperData } = useSelector((state) => ({
    loading: state.allWallpaperRingoneReducers.wallpaper.loading,
    wallpaperData: state.allWallpaperRingoneReducers.wallpaper.wallpaperData,
  }));

  var pagename = window.location.pathname;

  useEffect(() => {
    dispatch(getAllWallpaper());
    localStorage.setItem("searchValue", "");
    localStorage.setItem("searchTagValue", "");

    const query = new URLSearchParams(window.location.search);
    const searchparamValue = query.get("search");
    // console.log("searchparamValue", searchparamValue);
    if (
      searchparamValue != "" &&
      searchparamValue != null &&
      searchparamValue != "undefined"
    ) {
      localStorage.setItem("searchValue", searchparamValue);
    } else {
      let postId = window.location.href.split("/")[4];
      let tagValue = window.location.href.split("/")[5];
      // console.log("href", window.location.href.split("/"));
      if (postId == "wallpaper") {
        postId = window.location.href.split("/")[5];
        tagValue = window.location.href.split("/")[6];
        console.log("postid", postId);
        console.log("tag", tagValue);
      }
      if (
        postId != "" &&
        postId != null &&
        postId != "undefined" &&
        postId != 0
      ) {
        getWallpaperDetails(postId);
        setShow(true);
        localStorage.setItem("clickedId", postId);
      } else {
        setShow(false);
        localStorage.setItem("clickedId", "");
      }
      if (tagValue != "" && tagValue != null && tagValue != "undefined") {
        localStorage.setItem("searchTagValue", tagValue);
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
    getWallpaperDetails(id);
    setShow(true);
    history.push(`/wallpaper/${id}`);
    localStorage.setItem("clickedId", id);
    localStorage.setItem("wallpaper_user_id", user_id);

    console.log("id", id);
  };

  var getData = [];
  if (
    localStorage.getItem("wallpaper_list") &&
    localStorage.getItem("wallpaper_list") != null &&
    localStorage.getItem("wallpaper_list") != "undefined"
  ) {
    getData = JSON.parse(localStorage.getItem("wallpaper_list"));
  }

  const getWallpaperDetails = (getId) => {
    // console.log("test getid", getId);
    getData.forEach((data) => {
      if (data.id == getId) {
        setSingleWallpaper(data);
        setFavorite(data.is_favorite);
        // console.log("singleObj", singleObj);
      }
    });
  };

  const favUnfavorite = () => {
    dispatch(addFavoriteWallpaper());
    // console.log("isFav", isFav);
    if (isFav == 1) {
      setFavorite(0);
    } else {
      setFavorite(1);
    }
  };

  const handleClickTag = (tag) => {
    localStorage.setItem("searchTagValue", tag);

    dispatch(getAllWallpaper());
    var wallpaperID = localStorage.getItem("clickedId");

    if (wallpaperID == "") {
      wallpaperID = 0;
    }
    history.push(`/wallpaper/${wallpaperID}/${tag}`);
    setShow(false);
  };

  return (
    <div>
      <section>
        <Main />
      </section>

      <section id="wallpaper">
        {wallpaperData !== null && wallpaperData.length == 0 && (
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
                            <Link
                              to="/user/userprofile"
                              className="image-user-name"
                            >
                              @{singleObj.user_name}
                            </Link>
                          </span>
                        </div>
                        <div>
                          {/* <Button className="image-viewer-btn ">
                            <img
                              src={forwardIcon}
                              alt=""
                              style={{ color: "black" }}
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
                        <div className="row">
                          <div className="col-12">
                            <img
                              src={singleObj.wallpaper_ringtone}
                              className="image-viewer-selected-image"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="image-viewer-name-block mt-3">
                        <div>
                          <a
                            // href="empty"
                            // href={singleObj.wallpaper_ringtone}
                            // download={singleObj.wallpaper_ringtone}
                            onClick={() => dispatch(downloadNow(history))}
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
                    {/* <div >
                      <div className="image-viewer-inner">
                        <div className="image-viewer-tag">
                          <div>
                            {singleObj.tag &&
                              singleObj.tag.map((list) => (
                                <Button
                                  className="image-viewer-tag-btn"
                                  value={list.tag}
                                >
                                  {list.tag} Wallpapers
                                </Button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </section>
                  <section className="image-viewer-tag-box">
                    <div className="image-viewer-inner viewer-box-responsive">
                      <div className="image-viewer-tag">
                        <div>
                          {singleObj.tag &&
                            singleObj.tag.map((list, m) => (
                              <Button
                                key={m}
                                className="image-viewer-tag-btn"
                                value={list.tag}
                                onClick={() => handleClickTag(list.tag)}
                              >
                                {list.tag} Wallpapers
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

        <div className="home-wallpaper-block">
          <div className="row">
            {loading ? (
              <div className="spin-center">
                <Spin />
              </div>
            ) : (
              wallpaperData &&
              wallpaperData !== null &&
              wallpaperData !== "undefined" &&
              wallpaperData.slice(0, visible).map((item, m) => (
                <div key={m} className="col-sm-2">
                  <div className="all-wallpaper">
                    <img
                      src={item.wallpaper_ringtone}
                      className="upload-photo"
                      onClick={() => {
                        handleClick(item.id, item.user_id);
                        // setTitle(item.title);
                      }}
                    />

                    <div className="wallpaper-name">{item.title}</div>
                  </div>
                </div>
              ))
            )}
            <div className="text-center">
              {visible &&
                wallpaperData &&
                wallpaperData !== null &&
                wallpaperData !== "undefined" &&
                wallpaperData.length > visible && (
                  <Button onClick={loadMore} className="load-more-btn">
                    Load More
                  </Button>
                )}
            </div>
            {/* )} */}
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

export default Wallpaper;
