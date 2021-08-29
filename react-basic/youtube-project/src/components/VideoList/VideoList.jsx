import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import styles from "./videoList.module.css";

const VideoList = ({ videos, selectVideo, display }) => {
  return (
    <ul className={styles.videos}>
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          selectVideo={selectVideo}
          display={display}
        />
      ))}
    </ul>
  );
};

export default VideoList;
