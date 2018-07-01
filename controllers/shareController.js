"use strict";

// Import Controllers
const moment = require("moment");

// Import Controllers
const api = require("./networkController");
const database = require("./databaseController");

// Create Search JSON
module.exports.createSearchJson = async (json, status) => {
  try {
    // Variable
    let arr = [];

    for (let i = 0; i < json.length; i++) {
      // Block Variable
      let obj = {};
      let videoId = undefined;

      obj.publishedAt = json[i].snippet.publishedAt;
      obj.title = json[i].snippet.title;
      obj.description = json[i].snippet.description;
      obj.thumb = json[i].snippet.thumbnails.medium.url;
      obj.channelTitle = json[i].snippet.channelTitle;
      obj.uploader = json[i].snippet.title;

      if (status == 1) {
        videoId = json[i].id.videoId;
      } else {
        videoId = json[i].snippet.resourceId.videoId;
      }

      // Youtube Video Detail API Call
      const videoData = await api.youtubeVideoCall(videoId);

      // Iterate Youtube Video Detail
      for (let j = 0; j < videoData.data.items.length; j++) {
        obj.duration = moment
          .duration(videoData.data.items[j].contentDetails.duration)
          .asMinutes()
          .toFixed(2);

        obj.views = videoData.data.items[j].statistics.viewCount;
        obj.id = videoData.data.items[j].id;
        obj.suggest_url = `api/v1/suggest?url=${videoData.data.items[j].id}`;
        obj.stream_url = `api/v1/stream?url=${videoData.data.items[j].id}`;
        obj.get_url = `api/v1/download?url=${videoData.data.items[j].id}`;
        //obj.stream = data[j].player;

        // Push Array
        arr.push(obj);
      }
    }
    return Promise.resolve(arr);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create Playlist JSON
module.exports.createPlaylistJson = async (json, playlistId) => {
  try {
    for (let i = 0; i < json.length; i++) {
      // Block Variable
      let date = new Date(
        moment(json[i].snippet.publishedAt)
          .utc("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm ")
      );

      // Youtube Video Detail API Call
      let video = await api.youtubeVideoCall(
        json[i].snippet.resourceId.videoId
      );

      for (let j = 0; j < video.data.items.length; j++) {
        let duration = moment
          .duration(video.data.items[j].contentDetails.duration)
          .asMinutes()
          .toFixed(2);
        // let uploader = json[i].snippet.channelTitle.split("-");
        let uploader = json[i].snippet.title.split("-");

        // Keep Youtube Playlist Music Detail
        await database.writeYoutubeDetail(
          video.data.items[j].id,
          playlistId,
          json[i].snippet.title,
          json[i].snippet.description,
          json[i].snippet.thumbnails.medium.url,
          uploader[0],
          duration,
          video.data.items[j].statistics.viewCount,
          date
        );
      }
    }
    return Promise.resolve("Succesful");
  } catch (error) {
    return Promise.reject(error);
  }
};

// Youtube Trending Json
module.exports.youtubeJsonCreate = json => {
  // Variable
  let arr = [];

  // Json Iterate
  json.map((val, i) => {
    // Block Variable
    let obj = {};
    obj.title = val.title;
    obj.description = val.description;
    obj.thumb = val.thumb;
    obj.uploader = val.title;
    obj.duration = val.duration;
    obj.views = val.views;
    obj.id = val.youtube_id;
    obj.suggest_url = `api/v1/suggest?url=${val.youtube_id}`;
    obj.stream_url = `api/v1/stream?url=${val.youtube_id}`;
    obj.get_url = `api/v1/download?url=${val.youtube_id}`;

    // Push Array
    arr.push(obj);
  });
  return arr;
};
