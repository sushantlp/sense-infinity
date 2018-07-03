"use strict";

// Import Package
const dotEnv = require("dotenv");

const shareController = require("./shareController");

// Import Model
const localityModel = require("../models/locality");
const cityModel = require("../models/city");
const genderModel = require("../models/gender");

// Import Model
const senseConstModel = require("../models/sense_constant");

// Request Sense Infinity Static Data
module.exports.requestSenseStatic = (req, res) => {
  if (
    req.query.static_app_version !== undefined &&
    req.query.static_app_version !== ""
  ) {
    // Extract Parameter
    const appVersion = parseFloat(req.query.static_app_version);
    let flag = false;

    // // If Production then Execute
    // if (process.env.APP_ENV.toUpperCase() == "PROD") {
    //   // Get Token In Header
    //   token = req.headers["authorization"];
    // } else {
    //   // Get Token In Query
    //   token = req.query.token;
    // }

    // Logic Sense Static
    return logicSenseStatic(appVersion)
      .then(response => {
        if (response.hasOwnProperty("version")) {
          flag = true;
        }

        // Intialize
        const metadata = {
          //   version: flag ? response.version.toFixed(1) : appVersion.toFixed(1),
          version: flag ? response.version : appVersion,
          count: flag ? Object.keys(response.msg).length : null
        };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.msg,
              "/api/v1/merchant/get/static",
              200,
              response.success,
              metadata
            )
          );
      })
      .catch(error => {
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Keep Device Data
module.exports.requestKeepDeviceData = (req, res) => {
  // Check Paramter
  if (
    req.query.mobile !== undefined &&
    req.query.mobile !== "" &&
    req.query.store_id !== undefined &&
    req.query.store_id !== "" &&
    req.body.device_json !== undefined &&
    req.body.device_json !== ""
  ) {
    // Extract Parameter
    const deviceJson = req.body.device_json;
    const mobile = req.query.mobile;
    const storeId = req.query.store_id;

    // Logic Device Data
    return logicDeviceData(deviceJson, mobile, storeId)
      .then(response => {
        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.msg,
              "/api/v1/merchant/keep/device/data",
              200,
              response.success,
              null
            )
          );
      })
      .catch(error => {
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Logic Device Data
const logicDeviceData = async (deviceJson, mobile, storeId) => {
  try {
    // Intialize
    let responsedata = {};

    deviceJson.map((json, index) => {
      if (
        json.hasOwnProperty("latitude") &&
        json.hasOwnProperty("longitude") &&
        json.hasOwnProperty("brand") &&
        json.hasOwnProperty("device") &&
        json.hasOwnProperty("model") &&
        json.hasOwnProperty("app_id") &&
        json.hasOwnProperty("version_sdk") &&
        json.hasOwnProperty("version_release") &&
        json.hasOwnProperty("sense_version_number")
      ) {
      }
    });

    return (responsedata = {
      success: true,
      msg: "Succesful"
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Sense Static
const logicSenseStatic = async appVersion => {
  try {
    // Intialize
    let responsedata = {};

    // Read Sense Constant Record
    const senseConstant = await senseConstModel.readSenseConstant(
      "*",
      "STATIC_APP_VERSION",
      1
    );

    // Zero Means Empty Record
    if (senseConstant.length === 0) {
      return (responsedata = {
        success: false,
        msg: "Empty sense constant"
      });
    }

    // Check Sense Static App Version
    if (appVersion === parseFloat(senseConstant[0].value)) {
      return (responsedata = {
        success: true,
        msg: "Upto date"
      });
    } else {
      appVersion = parseFloat(senseConstant[0].value);
    }

    // Parallel City Locality Gender Record
    const parallel = await Promise.all([
      cityModel.readCityRecord(
        "city_id AS city_unique, city_name AS city, longitude AS lon, latitude AS lat",
        1
      ),
      localityModel.readLocalityRecord(
        "locality_id AS locality_unique, city_id AS city_unique, locality_name AS locality, pincode, longitude AS lon, latitude AS lat",
        1
      ),
      genderModel.readGenderRecord(
        "gender_id AS gender_unique, name AS gender_name",
        1
      )
    ]);

    if (parallel.length === 0) {
      return Promise.reject("Oops our bad!!!");
    }

    return (responsedata = {
      success: true,
      msg: {
        city: parallel[0],
        locality: parallel[1],
        gender: parallel[2]
      },
      version: appVersion
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
