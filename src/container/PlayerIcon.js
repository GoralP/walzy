import React, { useState, useEffect } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import { Button } from "reactstrap";

const useMultiAudio = urls => {
  const [sources] = useState(
    urls.map(url => {
      return {
        url:url.wallpaper_ringtone,
        audio: new Audio(url.wallpaper_ringtone)
      };
    })
  );

  const [players, setPlayers] = useState(
    urls.map(url => {
      return {
        url:url.wallpaper_ringtone,
        playing: false
      };
    })
  );

  const toggle = targetIndex => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex(p => p.playing === true);
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



const PlayerIcon = ({
  urls,
  ringtoneData = urls,
  showIndex,
  isSingle
}) => {
  const [players, toggle] = useMultiAudio(urls);
    console.log('showIndex',showIndex);
  return (
    <div>
        {ringtoneData !== null && isSingle != "true" &&
        ringtoneData.map((item,i) => (
            (showIndex == item.id)?
            <Player key={i} player={players[i]} toggle={toggle(i)} isSingle={isSingle} />
            :""
                
        ))
        }
     
    </div>
  );
};

const Player = ({ player, toggle, isSingle }) => {
    return (
    <div>
        <Button className={isSingle == "true" ? "image-viewer-play-btn":"play-btn"}  onClick={toggle}>{player.playing ? <IoPause /> : <IoPlay /> }</Button>
    </div>
    )
};

export default PlayerIcon;