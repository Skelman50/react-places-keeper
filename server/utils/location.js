const axios = require("axios");
const GEOCODER = require("node-geocoder");
require("dotenv").config();
const { HttpError } = require("../models/http-error");

exports.getCoordsForAddress = async address => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_API}`
  );

  if (!response.data || response.data.status == "ZERO_RESULTS") {
    const error = new HttpError("Not found coordinates", 404);
    throw error;
  }

  const coordinates = response.data.results[0].geometry.location;

  return coordinates;
};

exports.geocoder = GEOCODER({
  provider: "mapquest",
  apiKey: process.env.MAPGUEST_API,
  httpAdapter: "https",
  formatter: null
});
