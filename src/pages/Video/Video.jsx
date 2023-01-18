import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Video.module.css";
import VideoAPI from "../../api/VideoAPI";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

register("ko", koLocale);

function Video() {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: video,
  } = useQuery(["video", id], () => VideoAPI(id), {
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <div className={styles.video}>
      <div className={styles.screen}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay;"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>{video[0].snippet.title}</div>
        <div className={styles.bottom}>
          <div className={styles.wrap}>
            <div className={styles.left}>
              <div className={styles.channel}>
                {video[0].snippet.channelTitle}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.date}>
                {format(video[0].snippet.publishedAt, "ko")}
              </div>
              <div className={styles.view}>
                {video[0].statistics.viewCount}회
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
