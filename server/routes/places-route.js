const express = require("express");
const {
  checkValid,
  createPlaceValidator,
  updatePlaceValidator
} = require("../middlewares/validators");

const {
  getPlaceById,
  getUserPlaces,
  createPlace,
  updatePlace,
  deletePlace
} = require("../controllers/places-controller");

const { protected } = require("../middlewares/protected");

const router = express.Router();

router.post("/", createPlaceValidator, checkValid, protected, createPlace);

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getUserPlaces);

router.patch("/:pid", updatePlaceValidator, checkValid, protected, updatePlace);

router.delete("/:pid", protected, deletePlace);

module.exports = router;
