import React from "react";
import styles from "./VideoDetail.module.css";

const VideoDetail = ({ video }) => (
  <section className={styles.detail}>
    <iframe
      className={styles.video}
      type="text/html"
      width="100%"
      height="500px"
      src={`https://www.youtube.com/embed/${video.id}`}
      frameborder="0"
      allowfullscreen
    ></iframe>
    <h2 className={styles.title}>{video.snippet.title}</h2>
    <h3 className={styles.channelTitle}>{video.snippet.channelTitle}</h3>
    <p>{video.snippet.description}</p>
  </section>
);

export default VideoDetail;
