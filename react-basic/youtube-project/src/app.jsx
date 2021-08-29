import { useEffect, useState } from "react";
import styles from "./app.module.css";
import SearchHeader from "./components/searchHeader/SearchHeader";
import VideoDetail from "./components/VideoDetail/VideoDetail";
import VideoList from "./components/VideoList/VideoList";

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  const search = (query) => {
    youtube
      .search(query) //
      .then((videos) => {
        setVideos(videos);
        setSelectedVideo(null);
      });
  };

  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos));
  }, []);
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <div className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            selectVideo={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
