const { HttpError } = require("../models/http-error");

exports.errorHandler = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.code
      ? error.message || "Something went wrong try again later"
      : "Something went wrong try again later"
  });
};

exports.notRoutes = (req, res, next) => {
  next(new HttpError("Route not found", 404));
};
