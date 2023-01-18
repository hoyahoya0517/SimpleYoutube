import axios from "axios";

function VideoAPI(id) {
  return axios
    .get(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics",
      {
        params: {
          id: id,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      }
    )
    .then((res) => {
      return res.data.items;
    });
}

export default VideoAPI;
