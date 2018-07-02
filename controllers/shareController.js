"use strict";

// Generate the Random Number
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
