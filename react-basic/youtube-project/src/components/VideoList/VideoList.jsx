import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import styles from "./videoList.module.css";

const VideoList = (props) => {
  console.log(props);
  return (
    <ul className={styles.videos}>
      {props.videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </ul>
  );
};

export default VideoList;
