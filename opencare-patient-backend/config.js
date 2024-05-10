const dotenv = require('dotenv');
dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const FRONTEND_HOST = process.env.FRONTEND_HOST;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

module.exports = {
  dbURI: `mongodb://${MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ""}${MONGO_HOST}${MONGO_PORT ? `:${MONGO_PORT}` : ""}/opencare`,
  FRONTEND: `http://${FRONTEND_HOST}${FRONTEND_PORT ? `:${FRONTEND_PORT}` : ""}`,
  port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3001
};
