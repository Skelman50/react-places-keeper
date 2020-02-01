const { check, validationResult } = require("express-validator");
const { HttpError } = require("../models/http-error");

exports.checkValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(err => err.msg)[0];
    return next(new HttpError(msg, 400));
  }
  next();
};

exports.createPlaceValidator = [
  check("title", "Invalid title field")
    .not()
    .isEmpty(),
  check("description", "Invalid description field").isLength({ min: 5 }),
  check("address", "Invalid address field")
    .not()
    .isEmpty()
];

exports.updatePlaceValidator = [
  check("title", "Invalid title field")
    .not()
    .isEmpty(),
  check("description", "Invalid description field").isLength({ min: 5 })
];
