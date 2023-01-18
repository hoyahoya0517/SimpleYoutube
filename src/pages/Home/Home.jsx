import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import HomeAPI from "../../api/HomeAPI";
import styles from "./Home.module.css";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import { useNavigate } from "react-router-dom";

register("ko", koLocale);

function Home() {
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["home"], () => HomeAPI(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 3,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className={styles.home}>
      <div
        className={styles.video}
        onClick={() => {
          navigate(`/video/${videos[number].id}`);
        }}
        style={{
          background: `linear-gradient(to left,rgba(20, 20, 20, 0) 10%,rgba(20, 20, 20, 0.25) 25%,rgba(20, 20, 20, 0.5) 50%,rgba(20, 20, 20, 0.75) 75%,rgba(20, 20, 20, 1) 100%),url(${videos[number].snippet.thumbnails.maxres.url}) no-repeat center/cover`,
        }}
      >
        <div className={styles.detail}>
          <div className={styles.topDetail}>
            <div className={styles.channel}>
              {videos[number].snippet.channelTitle}
            </div>
            <div className={styles.dot}>•</div>
            <div className={styles.date}>
              {format(videos[number].snippet.publishedAt, "ko")}
            </div>
          </div>
          <div className={styles.title}>{videos[number].snippet.title}</div>
        </div>
      </div>
      <div className={styles.hot}>
        <div className={styles.hotContainer}>
          {videos.map((video, index) => {
            return (
              <div
                className={styles.hotBox}
                key={video.id}
                onClick={() => {
                  setNumber(index);
                }}
              >
                <div className={styles.hotImg}>
                  <img src={videos[index].snippet.thumbnails.medium.url} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
