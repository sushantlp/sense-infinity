"use strict";

// Import Controller
const validateController = require("./validateController");

// Import Model
const smsModel = require("../models/sms");
const errorModel = require("../models/error_log");
const userModel = require("../models/user");

// Request Merchant Signup
module.exports.requestAppSignup = (req, res) => {
  if (req.query.mobile !== undefined && req.query.mobile !== "") {
    // Extract Parameter
    const mobile = req.query.mobile;

    // Validate Merchant SignUp
    const validate = validateController.validateSignUpRequest(req, res);

    // Check Response Code
    if (isNaN(validate)) {
      return res.status(400).send(validate[0].msg);
    }

    // Logic App Signup
    return logicAppSignup(mobile)
      .then(result => {
        // Intialize
        // let metadata = { count: Object.keys(result).length, type: search };

        return res
          .status(200)
          .send(createJsonObject(result, "api/v1/trending", 200, "Hello"));
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Logic App Signup
const logicAppSignup = async mobile => {
  try {
    // Read Youtube Playlist All Data
    const limit = await smsModel.dailySmsLimit("*", mobile);

    // Check Sms Limit Per Day
    if (limit.length > 3) {
      return "You have exceeded your OTP request limit, please try again 24 hour";
    }
    return "Succesful";
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// Create Json Object
const createJsonObject = (data, location, code, bool, metadata) => {
  return JSON.stringify({
    results: data,
    requestLocation: location,
    status: code,
    bool: bool,
    metadata: metadata
  });
};
