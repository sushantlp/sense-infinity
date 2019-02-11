'use strict';

// Import Controller
const shareController = require('../controllers/share.controller');

// Import Package
const jwt = require('jsonwebtoken');

// Verify Json Web Token
module.exports.authJwt = (req, res, next) => {
  let token = undefined;

  if (process.env.NODE_ENV !== 'development') token = req.headers['authorization'];
  else token = req.body.token || req.query.token || req.headers['authorization'];

  if (token !== undefined) {
    jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    }, (err, decoded) => {
      if (err) {
        const refresh = shareController.refreshToken(token);
        res.header('authorization', refresh);
        return next();
      } else return next();

    });
  } else return res.status(401).send(shareController.createJsonObject([], 'No token provide', null, 401, false, null));
};