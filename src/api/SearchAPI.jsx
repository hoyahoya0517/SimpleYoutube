import axios from "axios";
import React from "react";

function SearchAPI(keyword) {
  return axios
    .get("https://youtube.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: "25",
        q: keyword,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    })
    .then((res) => {
      return res.data.items;
    });
}

export default SearchAPI;
