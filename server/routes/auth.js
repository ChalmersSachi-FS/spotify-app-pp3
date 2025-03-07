const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.Spotify_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Access token from Spotify
router.get("/login", (req, res) => {
  const scopes = "user-read-private user-read-email";
  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${REDIRECT_URI}`;
  res.redirect(authURL);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  const tokenURL = "https://accounts.spotify.com/api/token";

  try {
    const response = await axios.post(
      tokenURL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, expires_in } = response.data;
    const token = jwt.sign({ access_token }, JWT_SECRET, {
      expiresIn: expires_in,
    });

    res.cookie("token", token, { httpOnly: true });
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

module.exports = router;
