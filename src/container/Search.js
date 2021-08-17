// import React, { useState, useEffect } from "react";
// import { Main } from "../view";
// import { Button } from "reactstrap";
// import forwardIcon from "../images/forward-icon.png";
// import heartIcon from "../images/heart-icon.png";
// import flagIcon from "../images/flag-icon.png";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllWallpaper,
//   downloadNow,
//   addFavoriteWallpaper,
//   searchWallpaper,
// } from "../redux/actions";
// import ShareButton from "react-web-share-button";
// import { useHistory } from "react-router";
// import { FeedbackModal } from "../modal";

// const Search = () => {
//   const history = useHistory();
//   const [show, setShow] = useState(false);
//   const [singleObj, setSingleWallpaper] = useState({});
//   const [bgColor, setBgColor] = useState();
//   const [modalFeedback, setModalFeedback] = useState(false);

//   const toggleFeedback = () => setModalFeedback(!modalFeedback);

//   const dispatch = useDispatch();

//   const getToken = localStorage.getItem("token");

//   const { loading, searchWallpaperData } = useSelector((state) => ({
//     loading: state.searchWallpaperReducers.searchWallpaper.loading,
//     searchWallpaperData:
//       state.searchWallpaperReducers.searchWallpaper.searchWallpaperData,
//   }));
//   console.log("test-->", searchWallpaperData);

//   useEffect(() => {
//     dispatch(searchWallpaper());
//     // localStorage.setItem("searchValue", "");
//   }, [dispatch]);

//   const handleClick = (id) => {
//     getWallpaperDetails(id);
//     setShow(true);
//     localStorage.setItem("clickId", id);
//   };

//   var getData = [];
//   if (
//     localStorage.getItem("wallpaper_list") &&
//     localStorage.getItem("wallpaper_list") != null &&
//     localStorage.getItem("wallpaper_list") != "undefined"
//   ) {
//     getData = JSON.parse(localStorage.getItem("wallpaper_list"));
//   }

//   const getWallpaperDetails = (getId) => {
//     getData.forEach((data) => {
//       if (data.id == getId) {
//         setSingleWallpaper(data);
//         console.log("singleObj", singleObj);
//       }
//     });
//   };

//   return (
//     <div>
//       <section>
//         <Main />
//       </section>

//       <section id="wallpaper">
//         {show && (
//           <>
//             {loading ? (
//               <div>loading...</div>
//             ) : (
//               singleObj !== null && (
//                 <>
//                   <section className="image-viewer-box">
//                     <div className="image-viewer-inner">
//                       <div className="image-viewer-name-block">
//                         <div>
//                           <span className="image-viewer-name">
//                             {singleObj.title}
//                           </span>
//                           <br></br>
//                           <span className="image-user-name">
//                             @{singleObj.user_name}
//                           </span>
//                         </div>
//                         <div>
//                           {/* <Button className="image-viewer-btn ">
//                             <img
//                               src={forwardIcon}
//                               alt=""
//                               style={{ color: "black" }}
//                               className="image-viewer-icon"
//                             />
//                           </Button> */}
//                           <ShareButton
//                             buttonText={
//                               <img
//                                 src={forwardIcon}
//                                 alt=""
//                                 style={{ color: "black" }}
//                                 className="image-viewer-icon"
//                               />
//                             }
//                             buttonStyle={{
//                               backgroundColor: "white",
//                               borderRadius: "50%",
//                               border: "1px solid #FF3C8C",
//                               padding: "7px 11px",
//                             }}
//                             title={`${singleObj.title} - Walzy`}
//                           />
//                           <Button
//                             className="image-viewer-btn"
//                             onClick={() => {
//                               getToken
//                                 ? dispatch(addFavoriteWallpaper())
//                                 : history.push("/login");
//                             }}
//                           >
//                             <img
//                               src={heartIcon}
//                               alt=""
//                               className="image-viewer-icon"
//                             />
//                           </Button>
//                           <Button
//                             className="image-viewer-btn"
//                             onClick={() => {
//                               getToken
//                                 ? toggleFeedback()
//                                 : history.push("/login");
//                             }}
//                           >
//                             <img
//                               src={flagIcon}
//                               alt=""
//                               className="image-viewer-icon"
//                             />
//                           </Button>
//                         </div>
//                       </div>
//                       <div className="mt-4">
//                         <img
//                           src={singleObj.wallpaper_ringtone}
//                           className="image-viewer-selected-image"
//                         />
//                       </div>
//                       <div className="image-viewer-name-block mt-3">
//                         <div>
//                           <a
//                             // href="empty"
//                             // href={singleObj.wallpaper_ringtone}
//                             // download={singleObj.wallpaper_ringtone}
//                             onClick={() =>
//                               getToken
//                                 ? dispatch(downloadNow())
//                                 : history.push("/login")
//                             }
//                           >
//                             <Button className="download-btn">
//                               Download Now
//                             </Button>
//                           </a>
//                         </div>
//                         <div className="text-center">
//                           <span className="image-viewer-download-number">
//                             {singleObj.total_download}
//                           </span>
//                           <br></br>
//                           <span className="image-viewer-download-text">
//                             Downloads
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                   <section className="image-viewer-tag-box">
//                     <div className="image-viewer-inner">
//                       <div className="image-viewer-tag">
//                         <div>
//                           {singleObj.tag.map((list) => (
//                             <Button className="image-viewer-tag-btn">
//                               {list.tag}
//                             </Button>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                 </>
//               )
//             )}
//           </>
//         )}

//         <div className="home-wallpaper-block">
//           <div className="row">
//             {loading ? (
//               <div>loading...</div>
//             ) : (
//               searchWallpaperData &&
//               searchWallpaperData !== null &&
//               searchWallpaperData !== "undefined" &&
//               searchWallpaperData.map((item) => (
//                 <div className="col-sm-2">
//                   <div className="all-wallpaper">
//                     <img
//                       src={item.wallpaper_ringtone}
//                       className="upload-photo"
//                       onClick={() => {
//                         handleClick(item.id);
//                       }}
//                     />

//                     <div className="wallpaper-name">{item.title}</div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>
//       {modalFeedback && (
//         <FeedbackModal
//           modalFeedback={modalFeedback}
//           setModalFeedback={setModalFeedback}
//           toggleFeedback={toggleFeedback}
//         />
//       )}
//     </div>
//   );
// };

// export default Search;

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
} from "../redux/actions";
import ShareButton from "react-web-share-button";
import { useHistory } from "react-router";
import { FeedbackModal } from "../modal";
import { Spin } from "antd";

const Search = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [singleObj, setSingleWallpaper] = useState({});
  const [bgColor, setBgColor] = useState();
  const [modalFeedback, setModalFeedback] = useState(false);

  const toggleFeedback = () => setModalFeedback(!modalFeedback);

  const dispatch = useDispatch();

  const getToken = localStorage.getItem("token");

  const { loading, wallpaperData } = useSelector((state) => ({
    loading: state.allWallpaperRingoneReducers.wallpaper.loading,
    wallpaperData: state.allWallpaperRingoneReducers.wallpaper.wallpaperData,
  }));

  useEffect(() => {
    dispatch(getAllWallpaper());
    localStorage.setItem("searchValue", "");
  }, [dispatch]);

  const handleClick = (id) => {
    getWallpaperDetails(id);
    setShow(true);
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
        console.log("singleObj", singleObj);
      }
    });
  };

  return (
    <div>
      <section>
        <Main />
      </section>

      <section id="wallpaper">
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

        <div className="home-wallpaper-block">
          <div className="row">
            {loading ? (
              <div>loading...</div>
            ) : (
              wallpaperData &&
              wallpaperData !== null &&
              wallpaperData !== "undefined" &&
              wallpaperData.map((item) => (
                <div className="col-sm-2">
                  <div className="all-wallpaper">
                    <img
                      src={item.wallpaper_ringtone}
                      className="upload-photo"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    />

                    <div className="wallpaper-name">{item.title}</div>
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

export default Search;
