"use strict";

/**
 * Configuration of the server middlewares.
 */

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import expressWinston from "express-winston";
import expressStatusMonitor from "express-status-monitor";
import methodOverride from "method-override";
import cors from "cors";
import winstonInstance from "./winston";
import sass from "node-sass-middleware";
import favicon from "serve-favicon";
import robots from "express-robots";
import path from "path";

const isTest = process.env.NODE_ENV === "test";
const isDev = process.env.NODE_ENV === "development";

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressStatusMonitor());
  app.use(methodOverride());
  app.use(cors());
  if (isDev && !isTest) {
    app.use(morgan("dev"));
    expressWinston.requestWhitelist.push("body");
    expressWinston.responseWhitelist.push("body");
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg:
          "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
        colorStatus: true
      })
    );
  }

  app.use(
    sass({
      src: path.join(__dirname, "public"),
      dest: path.join(__dirname, "public")
    })
  );
  console.log(__dirname);
  // app.use(express.static(path.join(__dirname, "public")));
  // app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
  // app.use(robots(path.join(__dirname, "public", "robots.txt")));
  // app.disable("etag");
};
