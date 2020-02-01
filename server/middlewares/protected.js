const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { HttpError } = require("../models/http-error");

exports.protected = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new HttpError("No token", 401));
  }
  const [bearer, token] = req.headers.authorization.split(" ");
  if (!token || bearer !== "Bearer") {
    return next(new HttpError("No token", 401));
  }
  try {
    var verify = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new HttpError("No token", 401));
  }
  const user = await User.findById(verify.userId);
  if (!user) {
    return next(new HttpError("No token", 401));
  }
  req.user = user._id;
  next();
});
