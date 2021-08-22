import React from "react";
import VideoItem from "../VideoItem/VideoItem";

const VideoList = (props) => {
  return props.videos.map((video) => (
    <VideoItem key={video.id} video={video} />
  ));
};

export default VideoList;
