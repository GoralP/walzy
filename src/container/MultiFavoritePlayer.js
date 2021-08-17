import React, { useState, useEffect } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import { Button } from "reactstrap";

const useMultiAudio = (urls) => {
  const [sources] = useState(
    urls.ringtone.map((url) => {
      return {
        url: url.wallpaper_ringtone,
        audio: new Audio(url.wallpaper_ringtone),
      };
    })
  );

  const [players, setPlayers] = useState(
    urls.ringtone.map((url) => {
      return {
        url: url.wallpaper_ringtone,
        playing: false,
      };
    })
  );

  const toggle = (targetIndex) => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex((p) => p.playing === true);
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false;
      newPlayers[targetIndex].playing = true;
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false;
    } else {
      newPlayers[targetIndex].playing = true;
    }
    setPlayers(newPlayers);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, []);

  return [players, toggle];
};

const MultiFavoritePlayer = ({
  urls,
  getFavoriteData = urls,
  visible,
  ShareButton,
  forwardIcon,
  getToken,
  handleClickRingtone,
  addFavorite,
  history,
  BsFillHeartFill,
  heartIcon,
  loadMore,
  handleClickTagDetail,
}) => {
  const [players, toggle] = useMultiAudio(urls);
  const [allFavData, setToggleFavorite] = useState(getFavoriteData.ringtone);

  const favoriteRingtone = (i, itemid) => {
    const updatedData = [...allFavData];
    var rmIndex = updatedData.map(function (o) { return o.id; }).indexOf(itemid);
    updatedData.splice(rmIndex,1);
    setToggleFavorite(updatedData);
    addFavorite(itemid);
  };

  return (
    <div>
      <div className="image-uploaded-box">
        <div className="row">
          {allFavData !== null &&
            allFavData.slice(0, visible).map((item, i) => (
              <div key={i} className="col-sm-3 ringtone-block-1 ">
                <div className="rington">
                  <div className="ringtone-name-block">
                    <div>
                      <Player key={i} player={players[i]} toggle={toggle(i)} />
                    </div>
                    <div className="ringtone-name-box">
                      <div
                        className="ringtone-name"
                        onClick={() => {
                          handleClickRingtone(item.id);
                        }}
                      >
                        {item.title}
                      </div>
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
                      <div className="ringtone-download-number">
                        {item.ringtone_size ? item.ringtone_size : 0}
                      </div>
                      <div>Seconds</div>
                    </div>
                  </div>
                  <div className="ringtone-tag">
                    {item.tag.map((list,m) => (
                      <Button
                        key={m}
                        className="tag-btn"
                        onClick={() =>
                          handleClickTagDetail(item.id, item.title)
                        }
                      >
                        {list.tag}
                      </Button>
                    ))}
                  </div>
                  <div className="row mt-4">
                    <div className="col-5">
                      <div className="row">
                        <div className="col-3 ">
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
                            title={`${item.title} - Walzy`}
                          />
                        </div>
                        <div className="col-9 heart-icon-block">
                          <Button
                            className="forward-btn"
                            onClick={() => {
                              getToken
                                ? favoriteRingtone(i, item.id)
                                : history.push("/login");
                            }}
                          >
                            {/* <img src={heartIcon} alt="" /> */}
                            {item.is_favorite == 1 ? (
                              <BsFillHeartFill />
                            ) : (
                              <img
                                src={heartIcon}
                                alt=""
                                className="image-viewer-icon"
                              />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <Button
                        className="download-btn"
                        onClick={() => {
                          handleClickRingtone(item.id);
                        }}
                      >
                        Download Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="text-center">
        {visible &&
          allFavData !== null &&
          allFavData.length > visible && (
            <Button onClick={loadMore} className="load-more-btn">
              Load More
            </Button>
          )}
      </div>
    </div>
  );
};

const Player = ({ player, toggle }) => {
  return (
    <div>
      <Button className="play-btn" onClick={toggle}>
        {player.playing ? <IoPause /> : <IoPlay />}
      </Button>
    </div>
  );
};

export default MultiFavoritePlayer;
