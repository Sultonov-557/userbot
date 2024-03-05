const fs = require("fs");
const { config } = require("dotenv");
const { cleanEnv, str, num } = require("envalid");

config();

module.exports = cleanEnv(process.env, { SESSION: str(), API_ID: num(), API_HASH: str(), SECRET: str({ default: undefined }) });
