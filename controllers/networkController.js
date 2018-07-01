"use strict";

// Import
const dotEnv = require("dotenv");
const axios = require("axios");

// Constant Value
const SEARCH_API = "https://www.googleapis.com/youtube/v3/search?";
const VIDEO_PLAYLIST_API =
  "https://www.googleapis.com/youtube/v3/playlistItems?";
const VIDEO_DETAIL_API = "https://www.googleapis.com/youtube/v3/videos?";
const MAX_RESULT = 10;

// Load Environment Variables.
dotEnv.load({ path: ".env" });

// Youtube Search API Call
module.exports.youtubeSearchCall = async search => {
  try {
    // URL
    const URL =
      SEARCH_API +
      `type=video&q=${search}&maxResults=${MAX_RESULT}&part=snippet&key=${
        process.env.YOUTUBE_API_KEY
      }`;

    return await axios.get(URL);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Youtube Video Detail API Call
module.exports.youtubeVideoCall = async videoId => {
  try {
    // URL
    const URL =
      VIDEO_DETAIL_API +
      `part=contentDetails,player,statistics&id=${videoId}&key=${
        process.env.YOUTUBE_API_KEY
      }`;

    return await axios.get(URL);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Youtube Search Related Video Call
module.exports.youtubeSearchRelatedVideo = async videoId => {
  try {
    // URL
    const URL =
      SEARCH_API +
      `type=video&relatedToVideoId=${videoId}&maxResults=${MAX_RESULT}&part=snippet&key=${
        process.env.YOUTUBE_API_KEY
      }`;

    return await axios.get(URL);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Youtube Playlist Video Call
module.exports.youtubePlaylistVideo = async playlistId => {
  try {
    // URL
    const URL =
      VIDEO_PLAYLIST_API +
      `playlistId=${playlistId}&maxResults=${MAX_RESULT}&part=snippet,contentDetails&key=${
        process.env.YOUTUBE_API_KEY
      }`;

    return await axios.get(URL);
  } catch (error) {
    return Promise.reject(error);
  }
};
