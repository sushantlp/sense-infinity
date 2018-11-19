"use strict";

// Import Controller
const shareController = require("../controllers/shareController");

// Import Package
const jwt = require("jsonwebtoken");
const param = "/api/v1";

// Verify Json Web Token
module.exports.verifyJsonWebToken = (req, res, next) => {
  let token = false;

  // Split Original Url
  const url = req.originalUrl.split("?");

  if (url.length === 0) {
    return next();
  }

  if (
    url[0] === param + "/merchant/signup" ||
    url[0] === param + "/otp/verify"
  ) {
    return next();
  } else {
    if (process.env.APP_ENV.toUpperCase() === "PROD") {
      token = req.headers["authorization"];
    } else {
      token = req.body.token || req.query.token || req.headers["authorization"];
    }

    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        { algorithms: ["HS256"] },
        (err, decoded) => {
          if (err) {
            return res
              .status(403)
              .send(
                shareController.createJsonObject(
                  [],
                  err.message,
                  null,
                  403,
                  false,
                  null
                )
              );
          } else {
            return next();
          }
        }
      );
    } else {
      return res
        .status(403)
        .send(
          shareController.createJsonObject(
            [],
            "No token provide",
            null,
            403,
            false,
            null
          )
        );
    }
  }
};
