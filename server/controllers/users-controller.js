const bcrypt = require("bcrypt");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../models/http-error");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.json({ users });
});

exports.loadUser = asyncHandler(async (req, res, next) => {
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
  const newToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
  res.json({ token: newToken, user });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = await User.findOne({ email });
  if (!identifiedUser) {
    return next(new HttpError("Could not itentified user", 401));
  }
  const compare = await bcrypt.compare(password, identifiedUser.password);
  if (!compare) {
    return next(new HttpError("Could not itentified user", 401));
  }
  const token = jwt.sign(
    { userId: identifiedUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
  delete identifiedUser.password;
  res.json({ token, user: identifiedUser });
});

exports.signup = asyncHandler(async (req, res, next) => {
  const hasUser = await User.findOne({ email: req.body.email });
  if (hasUser) {
    return next(new HttpError("Email already exists", 422));
  }
  const password = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password };
  const createdUser = await new User(user).save();
  const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
  delete createdUser.password;
  res.json({ token, user: createdUser });
});
