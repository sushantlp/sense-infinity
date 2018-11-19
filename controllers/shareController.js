"use strict";

// Import Package
const jwt = require("jsonwebtoken");
const jwtRefresh = require("jsonwebtoken-refresh");
const moment = require("moment");

// Import Model
const smsModel = require("../models/sms");

// Generate Random Number
module.exports.generateRandomNumber = (length = 10) => {
  let characters = "123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return randomString;
};

// Generate JWT Token
module.exports.generateToken = payload => {
  return jwt.sign(
    {
      data: payload
    },
    process.env.JWT_SECRET,
    { expiresIn: 1500 }
  ); // Expiry time in second
};

// Refresh JWT Token
module.exports.refreshToken = token => {
  const originalDecoded = jwt.decode(token, { complete: true });
  return jwtRefresh.refresh(originalDecoded, 1500, process.env.JWT_SECRET);
};

// Create Json Object
module.exports.createJsonObject = (
  data,
  msg,
  location,
  code,
  bool,
  metadata
) => {
  return JSON.stringify({
    results: data,
    message: msg,
    requestLocation: location,
    status: code,
    bool: bool,
    metadata: metadata
  });
};

// Validate Password
module.exports.passwordAlgorthim = (mobile, password) => {
  // Intialize
  let responsedata = {};

  // Split String Into Array
  const mobileSplit = mobile.split("");

  // Array Length
  const length = mobileSplit.length;

  // Variable Declaration
  let pair1 = "";
  let pair2 = 0;

  // Loop
  for (let i = 0; i < length; i++) {
    //
    if (i % 2 == 0) {
      // Concat
      pair1 = pair1.concat(mobileSplit[i]);

      // Addition
      pair2 = parseInt(pair2) + parseInt(mobileSplit[i]);
    }
  }

  // Concat
  pair1 = pair1.concat(pair2);

  // Validate Password
  if (pair1 == password) {
    return (responsedata = {
      success: true,
      msg: "Succesful"
    });
  } else {
    return (responsedata = {
      success: false,
      msg: "Wrong password"
    });
  }
};

// Validate Otp
module.exports.validateOtp = async (mobile, otp) => {
  try {
    // Intialize
    let responsedata = {};

    // Read Sms Record
    const record = await smsModel.readSmsRecord("*", mobile, 1);

    // Check Result Length
    if (record.length > 0) {
      // Validate OTP
      if (parseInt(record[0].otp, 10) === parseInt(otp, 10)) {
        return (responsedata = {
          success: true,
          msg: "Succesful"
        });
      } else {
        return (responsedata = {
          success: false,
          msg: "Wrong otp"
        });
      }
    } else {
      return (responsedata = {
        success: false,
        msg: "Empty record"
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Validate Customer Detail
module.exports.validateCustomerDetail = (loop, bool) => {
  let responsedata = {};
  for (let i = 0; i < loop.length; i++) {
    // Customer Mobile Parameter Validate
    if (
      !loop[i].hasOwnProperty("customer_mobile") ||
      loop[i]["customer_mobile"] === ""
    ) {
      return (responsedata = {
        success: false,
        msg: "Customer mobile number should not be empty or null"
      });
    }

    // Customer First Name Parameter Validate
    if (!loop[i].hasOwnProperty("first_name") || loop[i]["first_name"] === "") {
      return (responsedata = {
        success: false,
        msg: "Customer first name should be valid"
      });
    }

    // Customer Last Name Parameter Validate
    if (!loop[i].hasOwnProperty("last_name") || loop[i]["last_name"] === "") {
      return (responsedata = {
        success: false,
        msg: "Customer last name should be valid"
      });
    }

    // Customer Dob Parameter Validate
    if (!loop[i].hasOwnProperty("dob") || loop[i]["dob"] === "") {
      return (responsedata = {
        success: false,
        msg: "Customer dob should be valid"
      });
    }

    // Customer Email Parameter Validate
    if (!loop[i].hasOwnProperty("email") || loop[i]["email"] === "") {
      return (responsedata = {
        success: false,
        msg: "Customer email should be valid"
      });
    }

    // Customer Gender Id Parameter Validate
    if (!loop[i].hasOwnProperty("gender_id") || loop[i]["gender_id"] === "") {
      return (responsedata = {
        success: false,
        msg: "Gender should be valid"
      });
    }

    // Customer Gender Id Is Numeric
    if (isNaN(loop[i]["gender_id"])) {
      return (responsedata = {
        success: false,
        msg: "Gender should be numeric"
      });
    }

    if (loop[i]["customer_mobile"].toString().length !== 10) {
      return (responsedata = {
        success: false,
        msg: "Mobile length should be 10 digit"
      });
    }

    // If True then Execute
    if (bool) {
      // Customer Married Parameter Validate
      if (!loop[i].hasOwnProperty("married")) {
        return (responsedata = {
          success: false,
          msg: "Married parameter missing"
        });
      }

      // Customer Spouse Name Parameter Validate
      if (!loop[i].hasOwnProperty("spouse_name")) {
        return (responsedata = {
          success: false,
          msg: "Spouse name parameter missing"
        });
      }

      // Customer Anniversary Parameter Validate
      if (!loop[i].hasOwnProperty("anniversary")) {
        return (responsedata = {
          success: false,
          msg: "Anniversary parameter missing"
        });
      }
    }
  }

  return (responsedata = {
    success: true,
    msg: "Succesful"
  });
};

// Reform Customer Detail
module.exports.reformCustomerDetail = (
  firstName,
  lastName,
  spouseName,
  dob,
  married,
  anniversary,
  flag
) => {
  // Variable
  let reform = {
    anniversary: null,
    first_name: null,
    last_name: null,
    spouse_name: null,
    dob: null,
    married: 0
  };

  // EMPTY || NULL || UNDEFINED
  if (
    firstName !== "" &&
    firstName !== null &&
    typeof firstName !== undefined
  ) {
    reform.first_name = firstName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  if (lastName !== "" && lastName !== null && typeof lastName !== undefined) {
    reform.last_name = lastName.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  if (dob !== "" && dob !== null && typeof dob !== undefined) {
    reform.dob = dob.replace(/\b[a-z]/g, function(f) {
      return f.toUpperCase();
    });
  }

  if (flag) {
    if (
      spouseName !== "" &&
      spouseName !== null &&
      typeof spouseName !== undefined
    ) {
      reform.spouse_name = spouseName.replace(/\b[a-z]/g, function(f) {
        return f.toUpperCase();
      });
    }

    if (
      anniversary !== "" &&
      anniversary !== null &&
      typeof anniversary !== undefined
    ) {
      reform.anniversary = moment(new Date(anniversary)).format("YYYY-MM-DD");
    }

    if (married !== "" && married !== null && typeof married !== undefined) {
      reform.married = married;
    }
  }

  return reform;
};
