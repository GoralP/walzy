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

const TagWallpaper = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [singleObj, setSingleWallpaper] = useState({});
  const [isFav, setFavorite] = useState(0);
  const [modalFeedback, setModalFeedback] = useState(false);
  const [visible, setVisible] = useState(12);

  const loadMore = () => {
    setVisible((prev) => prev + 12);
    console.log(visible);
  };

  const toggleFeedback = () => setModalFeedback(!modalFeedback);

  const dispatch = useDispatch();

  const getToken = localStorage.getItem("token");

  // const { loading, wallpaperData } = useSelector((state) => ({
  //   loading: state.allWallpaperRingoneReducers.wallpaper.loading,
  //   wallpaperData: state.allWallpaperRingoneReducers.wallpaper.wallpaperData,
  // }));

  const { loading, tagSearchData } = useSelector((state) => ({
    loading: state.tagSearchReducers.loading,
    tagSearchData: state.tagSearchReducers.tagSearchData,
  }));
  console.log(tagSearchData);


  var pagename = window.location.pathname;

  useEffect(() => {
    dispatch(getTagWallpaper());
    localStorage.setItem("searchValue", "");

    // let postId = window.location.href.split("wallpaper/")[1];
    // if (postId != "" && postId != null && postId != "undefined") {
    //   getWallpaperDetails(postId);
    //   setShow(true);
    //   localStorage.setItem("clickId", postId);
    // } else {
    //   setShow(false);
    //   localStorage.setItem("clickId", "");
    // }
  }, [dispatch]);

  const handleClick = (id) => {
    window.scrollTo(0, 0);
    getWallpaperDetails(id);
    setShow(true);
    history.push(`/wallpaper/${id}`);
    localStorage.setItem("clickId", id);
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
    getData.forEach((data) => {
      if (data.id == getId) {
        setSingleWallpaper(data);
        setFavorite(data.is_favorite);
        console.log("singleObj", singleObj);
      }
    });
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
    dispatch(getTagWallpaper());
    history.push(`/wallpaper/${tag}`);
    console.log("hello")

  }

  return (
    <div>
      <section>
        <Main />
      </section>

      <section id="wallpaper">
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
                        <img
                          src={singleObj.wallpaper_ringtone}
                          className="image-viewer-selected-image"
                        />
                      </div>
                      <div className="image-viewer-name-block mt-3">
                        <div>
                          <a
                            // href="empty"
                            // href={singleObj.wallpaper_ringtone}
                            // download={singleObj.wallpaper_ringtone}
                            onClick={() => dispatch(downloadNow())}
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
                    <div className="image-viewer-inner">
                      <div className="image-viewer-tag">
                        <div>
                          {singleObj.tag &&
                            singleObj.tag.map((list) => (
                              <Button
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
            {/* {loading ? (
              <div>loading...</div>
            ) : ( */}
            {tagSearchData &&
              tagSearchData !== null &&
              tagSearchData !== "undefined" &&
              tagSearchData.slice(0, visible).map((item) => (
                <div className="col-sm-2">
                  <div className="all-wallpaper">
                    <img
                      src={item.wallpaper_ringtone}
                      className="upload-photo"
                      onClick={() => {
                        handleClick(item.id);
                        // setTitle(item.title);
                      }}
                    />

                    <div className="wallpaper-name">{item.title}</div>
                  </div>
                </div>
              ))}
            <div className="text-center">
              {visible &&
                tagSearchData &&
                tagSearchData !== null &&
                tagSearchData !== "undefined" &&
                tagSearchData.length && (
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

export default TagWallpaper;
