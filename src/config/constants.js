require("dotenv").config();

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL
};

const testConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL
};

const defaultConfig = {
  PORT: process.env.PORT || 8080,
  RAVEN_ID: process.env.RAVEN_ID,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_DRIVER: process.env.DB_DRIVER
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    case "test":
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};
