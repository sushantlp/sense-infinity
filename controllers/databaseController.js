/**
 * Database Connection
 */

"use strict";

// Import
const mysql = require("mysql2/promise");
const dotEnv = require("dotenv");
const Sequelize = require("sequelize");
const bluebird = require("bluebird");
const moment = require("moment");

// Load Environment Variables from .env file.
dotEnv.load({ path: ".env" });

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

// Sequelize Connection
module.exports.sequelizeConnection = () => {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DRIVER,
      pool: {
        max: 90,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialectOptions: {
        charset: "utf8mb4"
      },
      define: {
        underscored: false,
        freezeTableName: false,
        timestamps: true
      }
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
};

/**
 * Start Database Read and Write
 */

// Read Youtube Playlist All Data
module.exports.readAllPlaylistData = async (select, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM playlists WHERE status=?`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Youtube Playlist Data By Name
module.exports.readPlaylistDataByName = async (select, name, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM playlists WHERE playlist_name=? AND status=? `;

    // Query Database
    const [rows, fields] = await connection.execute(query, [name, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read Youtube Data By Id
module.exports.readYoutubeDataById = async (select, playlistId, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM youtube_collections WHERE playlist_id=? AND status=? `;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      playlistId,
      status
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Read All Youtube Data
module.exports.readAllYoutubeData = async (select, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT MAX(${select}) FROM youtube_collections WHERE status=? `;

    // Query Database
    const [rows, fields] = await connection.execute(query, [
      playlistId,
      status
    ]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Youtube Playlist Music Detail
module.exports.writeYoutubeDetail = async (
  youtubeId,
  playlistId,
  title,
  description,
  thumb,
  uploader,
  duration,
  views,
  publishedAt
) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "INSERT INTO `youtube_collections` (`youtube_id`, `playlist_id`, `title`, `description`, `thumb`,`uploader`,`duration`,`views`,`published_at`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      youtubeId,
      playlistId,
      title,
      description,
      thumb,
      uploader,
      duration,
      views,
      publishedAt,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Deactivate Youtube Detail
module.exports.deactivateYoutubeBYPlaylistId = async (playlistId, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "UPDATE `youtube_collections` SET `status`=?, `updated_at`=? WHERE `playlist_id`=?";

    // Query Database
    const row = await connection.execute(query, [status, now, playlistId]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
