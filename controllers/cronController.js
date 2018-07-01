"use strict";

const api = require("./networkController");
const database = require("./databaseController");
const share = require("./shareController");

// Request Cron Scheduling
module.exports.requestCronScheduling = (req, res) => {
  // Logic Cron Scheduling
  return logicCronScheduling()
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};

// Logic Cron Scheduling
module.exports.logicCronScheduling = async () => {
  try {
    // Read Youtube Playlist All Data
    const playlistData = await database.readAllPlaylistData(
      "playlist_name,playlist_id,playlist_url",
      1
    );

    playlistData.map(async (playlist, i) => {
      // Get Playlist Id In Url
      let playArray = playlist.playlist_url.split("list=");

      // Deactivate Youtube Detail
      database.deactivateYoutubeBYPlaylistId(playlist.playlist_id, 0);

      // Youtube Playlist Video Call
      let response = await api.youtubePlaylistVideo(playArray[1]);

      // Create Playlist JSON
      return share.createPlaylistJson(
        response.data.items,
        playlist.playlist_id
      );
    });

    return Promise.resolve("Succesful");
  } catch (error) {
    return Promise.reject(error);
  }
};
