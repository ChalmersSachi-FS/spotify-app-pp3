const express = require("express");
const { login, getSpotifyData } = require("../controllers/authController");
const router = express.Router();

router.get("/login", login);
router.get("/spotify-data", getSpotifyData);

module.exports = router;
