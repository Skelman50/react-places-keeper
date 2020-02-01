const express = require("express");

const {
  login,
  signup,
  getUsers,
  loadUser
} = require("../controllers/users-controller");

const router = express.Router();

router.get("/", getUsers);

router.post("/login", login);

router.get("/load", loadUser);

router.post("/signup", signup);

module.exports = router;
