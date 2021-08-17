import React, { useState, useEffect } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import { Button } from "reactstrap";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = (id) => {
    setPlaying(!playing);
    localStorage.setItem("songid", id);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);
  console.log("useAudio--->>>>", playing);

  return [playing, toggle];
};

const Player = ({ url, songid, isSingle }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <Button
        className={isSingle == "true" ? "image-viewer-play-btn" : "play-btn"}
        onClick={() => toggle()}
      >
        {playing ? <IoPause key={songid} /> : <IoPlay key={songid} />}
      </Button>
    </div>
  );
};

export default Player;
