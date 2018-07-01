"use strict";

// Import Package
const circularJSON = require("circular-json");

// Import Controllers
const api = require("./networkController");
const database = require("./databaseController");
const share = require("./shareController");

// Youtube Playlist Data
/*const playlist = {
  Popular:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI",
  Latest:
    "https://www.youtube.com/playlist?list=PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
  India:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alF0GjxEs0V_XFCe7LM3ReH",
  Weekly:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
  Electronic:
    "https://www.youtube.com/playlist?list=PLFPg_IUxqnZNnACUGsfn50DySIOVSkiKI",
  Popular_Music_Videos:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI",
  New_Music_This_Week:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
  Top_Tracks:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alcyTM2lkWJU34KtfPXQDaX",
  Hip_Hop_and_RB_Hotlist:
    "https://www.youtube.com/playlist?list=PLFgquLnL59amBBTCULGWSotJu2CkioYkj",
  Pop_Hotlist:
    "https://www.youtube.com/playlist?list=PLFgquLnL59altZg1f_Kr1kGUYE6j-NE0M",
  Most_Viewed: "https://www.youtube.com/playlist?list=PL8A83124F1D79BD4F"
}; */

// Request Youtube Search Data
module.exports.requestSearchData = (req, res) => {
  if (req.query.type !== undefined && req.query.type !== "") {
    // Extract Parameter
    const search = req.query.type;

    // Youtube Search API Call
    return api
      .youtubeSearchCall(search)
      .then(result => {
        // Create Search JSON
        return share
          .createSearchJson(result.data.items, 1)
          .then(result => {
            // Intialize
            const metadata = { count: result.length, type: search };

            return res
              .status(200)
              .send(createJsonObject(result, "api/v1/search", 200, metadata));
          })
          .catch(error => {
            return res.status(500).send("Oops our bad!!!");
          });
      })
      .catch(error => {
        return res
          .status(500)
          .send(
            "Oops our bad!!!" /*circularJSON.stringify(error.response.statusText)*/
          );
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Playlist All Data
module.exports.requestPlaylistData = (req, res) => {
  // Varibale
  let metadata = {};

  return database
    .readAllPlaylistData("playlist_name AS playlist,playlist_url AS url", 1)
    .then(result => {
      // Intialize
      metadata = { count: result.length };

      return res
        .status(200)
        .send(createJsonObject(result, "api/v1/playlist", 200, metadata));
    })
    .catch(error => {
      console.log(error);
      return res.status(400).send("Oops our bad!!!");
    });
};

// Request Youtube Trending Data
module.exports.requestTrendingData = (req, res) => {
  if (req.query.type !== undefined && req.query.type !== "") {
    // Extract Parameter
    const search = req.query.type;

    // Logic Trending Data
    return logicTrendingData(search)
      .then(result => {
        // Intialize
        let metadata = { count: Object.keys(result).length, type: search };

        return res
          .status(200)
          .send(createJsonObject(result, "api/v1/trending", 200, metadata));
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Stream Data
module.exports.requestStreamData = (req, res) => {
  if (req.query.url !== undefined && req.query.url !== "") {
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Related Video Data
module.exports.requestRelatedData = (req, res) => {
  if (req.query.url !== undefined && req.query.url !== "") {
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Audio Download
module.exports.requestDownloadData = (req, res) => {
  if (req.query.url !== undefined && req.query.url !== "") {
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Create Json Object
const createJsonObject = (data, location, code, metadata) => {
  return JSON.stringify({
    results: data,
    requestLocation: location,
    status: code,
    metadata: metadata
  });
};

// Logic Trending Data
const logicTrendingData = async search => {
  try {
    // Variable
    let dataObject = {};
    let params = search.split(",");

    // Read Youtube Playlist All Data
    const playlistData = await database.readAllPlaylistData(
      "playlist_id,playlist_name",
      1
    );

    // Iterate Param Data
    const youtube = params.map(async (param, i) => {
      let playlistId = 0;
      let playlistName = "";

      // Iterate Database Data
      for (let i = 0; i < playlistData.length; i++) {
        playlistName = playlistData[i].playlist_name.replace(/ /g, "_");
        //let decodeParam = decodeURI(param).replace(/\s/g, "");
        let decodeParam = decodeURI(param).replace(/ /g, "_");

        if (decodeParam == playlistName) {
          playlistId = playlistData[i].playlist_id;
          break;
        }
      }

      if (playlistId > 0) {
        //playlistName = playlistName.replace(/_/g, " ");
        let read = await database.readYoutubeDataById(
          "youtube_id,title,description,thumb,uploader,duration,views",
          playlistId,
          1
        );

        // Youtube Trending Json
        dataObject[playlistName] = share.youtubeJsonCreate(read);
      }
    });

    return Promise.all(youtube).then(res => {
      return Promise.resolve(dataObject);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
