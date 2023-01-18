import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchAPI from "../../api/SearchAPI";
import TitleTooLong from "../../utils/TitleTooLong";
import styles from "./VideoCard.module.css";

function VideoCard({ keyword }) {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: search,
  } = useQuery(["search", keyword], () => SearchAPI(keyword), {
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
    <div className={styles.videoCard}>
      {search.map((searchVideo) => {
        return (
          <div
            className={styles.box}
            key={searchVideo.id.videoId}
            onClick={() => {
              navigate(`/video/${searchVideo.id.videoId}`);
            }}
          >
            <div className={styles.thumbnails}>
              <img src={searchVideo.snippet.thumbnails.medium.url} />
            </div>
            <div className={styles.title}>
              <p>{TitleTooLong(searchVideo.snippet.title)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VideoCard;
