require("dotenv").config();
const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_API_ENDPOINT = "https://images-api.nasa.gov/search";

//const REACT_APP_BASE_URL = "http://localhost:8000";

const REACT_APP_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL_LOCAL;

console.log("REACT_APP_BASE_URL: ", REACT_APP_BASE_URL);
const config = {
  NASA_API_ENDPOINT,
  NASA_API_KEY,
  REACT_APP_BASE_URL,
};

export default config;
