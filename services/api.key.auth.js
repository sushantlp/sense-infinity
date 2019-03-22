'use strict';

// Import Controller
const shareController = require('../controllers/share.controller');

// Import Model
const apiKeyModal = require("../models/api_key");

// Validate Api Key 
module.exports.apiKeyAuth = async(req, res, next) => {

  const header = req.headers["api-key"];

  if (header !== undefined) {

    // Split
    const strArray = header.split('.');
    if (strArray.length !== 2) return res.status(401).send(shareController.createJsonObject([], 'Invalid secret key', null, 401, false, null));

    // Read Api Key
    let keyData = await apiKeyModal.readApiKey('*', strArray[0], strArray[1], 1);

    // Parse
    keyData = JSON.stringify(keyData);
    keyData = JSON.parse(keyData);

    // Zero Means Empty Record
    if (keyData.length === 0) return res.status(401).send(shareController.createJsonObject([], 'Wrong secret key', null, 401, false, null));

    res.userKey = keyData[0].user_id;

    return next();
  } else return res.status(401).send(shareController.createJsonObject([], 'Empty partner secret key', null, 401, false, null));
};