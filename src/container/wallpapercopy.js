// import React, { useState, useEffect } from "react";
// import { Main } from "../view";
// import { Button } from "reactstrap";
// import forwardIcon from "../images/forward-icon.png";
// import heartIcon from "../images/heart-icon.png";
// import flagIcon from "../images/flag-icon.png";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllWallpaper } from "../redux/actions";

// const Wallpaper = () => {
//   const [show, setShow] = useState(false);
//   const [mainsrc, setMainsrc] = useState(true);
//   const dispatch = useDispatch();

//   const setImage = (e) => {
//     var imgsrc = e.target.src;
//     console.log(imgsrc);
//     setMainsrc(imgsrc);
//     setShow(true);
//   };

//   const { loading, wallpaperData } = useSelector((state) => ({
//     loading: state.allWallpaperRingoneReducers.wallpaper.loading,
//     wallpaperData: state.allWallpaperRingoneReducers.wallpaper.wallpaperData,
//   }));
//   // console.log("wallpaper", wallpaperData);

//   useEffect(() => {
//     dispatch(getAllWallpaper());
//   }, [dispatch]);

//   const handleClick = (id) => {
//     console.log("id", id);
//     localStorage.setItem("clickId", id);
//     setShow(true);

//     getWallpaperDetails();
//   };

//   const getId = localStorage.getItem("clickId");
//   const getData = JSON.parse(localStorage.getItem("wallpaper"));
//   // const getId = localStorage.getItem("clickId");
//   console.log("getid", getId);
//   const getWallpaperDetails = () => {
//     console.log("hello");
//     return (
//       <section id="wallpaper">
//         {show && (
//           <>
//             {loading ? (
//               <div>loading...</div>
//             ) : (
//               getData !== null &&
//               getData.map((item) => (
//                 <>
//                   {getId == item.id ? (
//                     <>
//                       <section className="image-viewer-box">
//                         <div className="image-viewer-inner">
//                           <div className="image-viewer-name-block">
//                             <div>
//                               <span className="image-viewer-name">
//                                 {item.title}
//                               </span>
//                               <br></br>
//                               <span className="image-user-name">
//                                 @{item.user_name}
//                               </span>
//                             </div>
//                             <div>
//                               <Button className="image-viewer-btn ">
//                                 <img
//                                   src={forwardIcon}
//                                   alt=""
//                                   className="image-viewer-icon"
//                                 />
//                               </Button>
//                               <Button className="image-viewer-btn ">
//                                 <img
//                                   src={heartIcon}
//                                   alt=""
//                                   className="image-viewer-icon"
//                                 />
//                               </Button>
//                               <Button className="image-viewer-btn">
//                                 <img
//                                   src={flagIcon}
//                                   alt=""
//                                   className="image-viewer-icon"
//                                 />
//                               </Button>
//                             </div>
//                           </div>
//                           <div className="mt-4">
//                             <img
//                               src={item.wallpaper_ringtone}
//                               className="image-viewer-selected-image"
//                             />
//                           </div>
//                           <div className="image-viewer-name-block mt-3">
//                             <div>
//                               <Button className="download-btn">
//                                 Download Now
//                               </Button>
//                             </div>
//                             <div className="text-center">
//                               <span className="image-viewer-download-number">
//                                 {item.total_download}
//                               </span>
//                               <br></br>
//                               <span className="image-viewer-download-text">
//                                 Downloads
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                       <section className="image-viewer-tag-box">
//                         <div className="image-viewer-inner">
//                           <div className="image-viewer-tag">
//                             <div>
//                               {item.tag.map((list) => (
//                                 <Button className="image-viewer-tag-btn">
//                                   {list.tag}
//                                 </Button>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                     </>
//                   ) : (
//                     ""
//                   )}
//                 </>
//               ))
//             )}
//             {/* <section className="image-viewer-box">
//               <div className="image-viewer-inner">
//                 <div className="image-viewer-name-block">
//                   <div>
//                     <span className="image-viewer-name">Nature</span>
//                     <br></br>
//                     <span className="image-user-name">@momdad</span>
//                   </div>
//                   <div>
//                     <Button className="image-viewer-btn ">
//                       <img
//                         src={forwardIcon}
//                         alt=""
//                         className="image-viewer-icon"
//                       />
//                     </Button>
//                     <Button className="image-viewer-btn ">
//                       <img
//                         src={heartIcon}
//                         alt=""
//                         className="image-viewer-icon"
//                       />
//                     </Button>
//                     <Button className="image-viewer-btn">
//                       <img
//                         src={flagIcon}
//                         alt=""
//                         className="image-viewer-icon"
//                       />
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <img src={mainsrc} className="image-viewer-selected-image" />
//                 </div>
//                 <div className="image-viewer-name-block mt-3">
//                   <div>
//                     <Button className="download-btn">Download Now</Button>
//                   </div>
//                   <div className="text-center">
//                     <span className="image-viewer-download-number">139</span>
//                     <br></br>
//                     <span className="image-viewer-download-text">
//                       Downloads
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </section> */}

//             {/* <section className="image-viewer-tag-box">
//               <div className="image-viewer-inner">
//                 <div className="image-viewer-tag">
//                   <div>
//                     <Button className="image-viewer-tag-btn">wallpapers</Button>
//                     <Button className="image-viewer-tag-btn">
//                       new wallpaper
//                     </Button>
//                     <Button className="image-viewer-tag-btn">
//                       ghost wallpaper
//                     </Button>
//                     <Button className="image-viewer-tag-btn">
//                       hd wallpaper
//                     </Button>
//                     <Button className="image-viewer-tag-btn">
//                       new wallpaper
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </section> */}
//           </>
//         )}

//         <div className="home-wallpaper-block">
//           <div className="row">
//             {loading ? (
//               <div>loading...</div>
//             ) : (
//               wallpaperData !== null &&
//               wallpaperData.map((item) => (
//                 <div className="col-sm-2">
//                   <div className="all-wallpaper">
//                     <img
//                       src={item.wallpaper_ringtone}
//                       className="upload-photo"
//                       // onClick={setImage}
//                       onClick={() => {
//                         // setShow(true);
//                         handleClick(item.id);
//                       }}
//                     />
//                     {/* {item.tag.map((list) => (
//                       <div>{list.tag}</div>
//                     ))} */}
//                     <div className="wallpaper-name">{item.title}</div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>
//     );
//   };

//   // const getId = localStorage.getItem("clickId");
//   // console.log("getid", getId);
//   // const getData = JSON.parse(localStorage.getItem("wallpaper"));
//   // console.log("sdf", getData);

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
//               getData !== null &&
//               getData.map((item) => (
//                 <>
//                   {getId == item.id ? (
//                     <>
//                       <section className="image-viewer-box">
//                         <div className="image-viewer-inner">
//                           <div className="image-viewer-name-block">
//                             <div>
//                               <span className="image-viewer-name">
//                                 {item.title}
//                               </span>
//                               <br></br>
//                               <span className="image-user-name">
//                                 @{item.user_name}
//                               </span>
//                             </div>
//                             <div>
//                               <Button className="image-viewer-btn ">
//                                 <img
//                                   src={forwardIcon}
//                                   alt=""
//                                   className="image-viewer-icon"
//                                 />
//                               </Button>
//                               <Button className="image-viewer-btn ">
//                                 <img
//                                   src={heartIcon}
//                                   alt=""
//                                   className="image-viewer-icon"
//                                 />
//                               </Button>
//                               <Button className="image-viewer-btn">
//                                 <img
//                                   src={flagIcon}
//                                   alt=""
//                                   className="image-viewer-icon"
//                                 />
//                               </Button>
//                             </div>
//                           </div>
//                           <div className="mt-4">
//                             <img
//                               src={item.wallpaper_ringtone}
//                               className="image-viewer-selected-image"
//                             />
//                           </div>
//                           <div className="image-viewer-name-block mt-3">
//                             <div>
//                               <Button className="download-btn">
//                                 Download Now
//                               </Button>
//                             </div>
//                             <div className="text-center">
//                               <span className="image-viewer-download-number">
//                                 {item.total_download}
//                               </span>
//                               <br></br>
//                               <span className="image-viewer-download-text">
//                                 Downloads
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                       <section className="image-viewer-tag-box">
//                         <div className="image-viewer-inner">
//                           <div className="image-viewer-tag">
//                             <div>
//                               {item.tag.map((list) => (
//                                 <Button className="image-viewer-tag-btn">
//                                   {list.tag}
//                                 </Button>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                     </>
//                   ) : (
//                     ""
//                   )}
//                 </>
//               ))
//             )}
//             {/* <section className="image-viewer-box">
//               <div className="image-viewer-inner">
//                 <div className="image-viewer-name-block">
//                   <div>
//                     <span className="image-viewer-name">Nature</span>
//                     <br></br>
//                     <span className="image-user-name">@momdad</span>
//                   </div>
//                   <div>
//                     <Button className="image-viewer-btn ">
//                       <img
//                         src={forwardIcon}
//                         alt=""
//                         className="image-viewer-icon"
//                       />
//                     </Button>
//                     <Button className="image-viewer-btn ">
//                       <img
//                         src={heartIcon}
//                         alt=""
//                         className="image-viewer-icon"
//                       />
//                     </Button>
//                     <Button className="image-viewer-btn">
//                       <img
//                         src={flagIcon}
//                         alt=""
//                         className="image-viewer-icon"
//                       />
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <img src={mainsrc} className="image-viewer-selected-image" />
//                 </div>
//                 <div className="image-viewer-name-block mt-3">
//                   <div>
//                     <Button className="download-btn">Download Now</Button>
//                   </div>
//                   <div className="text-center">
//                     <span className="image-viewer-download-number">139</span>
//                     <br></br>
//                     <span className="image-viewer-download-text">
//                       Downloads
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </section> */}

//             {/* <section className="image-viewer-tag-box">
//               <div className="image-viewer-inner">
//                 <div className="image-viewer-tag">
//                   <div>
//                     <Button className="image-viewer-tag-btn">wallpapers</Button>
//                     <Button className="image-viewer-tag-btn">
//                       new wallpaper
//                     </Button>
//                     <Button className="image-viewer-tag-btn">
//                       ghost wallpaper
//                     </Button>
//                     <Button className="image-viewer-tag-btn">
//                       hd wallpaper
//                     </Button>
//                     <Button className="image-viewer-tag-btn">
//                       new wallpaper
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </section> */}
//           </>
//         )}

//         <div className="home-wallpaper-block">
//           <div className="row">
//             {loading ? (
//               <div>loading...</div>
//             ) : (
//               wallpaperData !== null &&
//               wallpaperData.map((item) => (
//                 <div className="col-sm-2">
//                   <div className="all-wallpaper">
//                     <img
//                       src={item.wallpaper_ringtone}
//                       className="upload-photo"
//                       // onClick={setImage}
//                       onClick={() => {
//                         // setShow(true);
//                         handleClick(item.id);
//                       }}
//                     />
//                     {/* {item.tag.map((list) => (
//                       <div>{list.tag}</div>
//                     ))} */}
//                     <div className="wallpaper-name">{item.title}</div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Wallpaper;
