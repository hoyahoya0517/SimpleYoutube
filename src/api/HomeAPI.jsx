import axios from "axios";

export default function HomeAPI() {
  return axios
    .get("https://youtube.googleapis.com/youtube/v3/videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        regionCode: "KR",
        maxResults: "5",
        // videoCategoryId: "10",
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    })
    .then((res) => res.data.items);
}
