const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { HttpError } = require("../models/http-error");
const { getCoordsForAddress, geocoder } = require("../utils/location");
const Place = require("../models/place");
const User = require("../models/user");

exports.getPlaceById = asyncHandler(async (req, res, next) => {
  const placeId = req.params.pid;
  const place = await Place.findById(placeId);
  if (!place) {
    return next(new HttpError("Place not found", 404));
  }
  res.json({ place });
});

exports.getUserPlaces = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const places = await Place.find({ creator: userId });
  if (!places.length) {
    return next(new HttpError("Places not found", 404));
  }
  res.json({ places });
});

exports.createPlace = asyncHandler(async (req, res, next) => {
  const location = await getCoordsForAddress(req.body.address);
  const createdPlace = { ...req.body, location, creator: req.user };
  const user = await User.findById(req.user);
  const place = await new Place(createdPlace).save();
  user.places.push(place);
  await user.save();
  res.json({ place });
});

exports.updatePlace = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const { pid } = req.params;
  const place = await Place.findByIdAndUpdate(
    pid,
    { title, description },
    { new: true }
  );
  if (!place) {
    return next(new HttpError("Place not found", 404));
  }
  res.json({ place });
});

exports.deletePlace = asyncHandler(async (req, res, next) => {
  const { pid } = req.params;
  const [user, place] = await Promise.all([
    User.findById(req.user),
    Place.findById(pid)
  ]);
  if (!place) {
    return next(new HttpError("Place not found", 404));
  }
  if (user._id.toString() !== place.creator.toString()) {
    return next(new HttpError("No permissions", 403));
  }
  user.places = user.places.filter(item => item.toString() !== pid);
  await Promise.all([user.save(), place.remove()]);
  const places = await Place.find();
  res.json({ places });
});
