const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const {
  spotifyClientId,
  spotifyClientSecret,
  jwtSecret,
  redirectUri,
} = require("../config/keys");

const router = express.Router();

// Step 1: Redirect user to Spotify login
router.get("/login", (req, res) => {
  const scopes = "user-read-private user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
  res.json({ url: authUrl });
});

// Step 2: Get access token from Spotify
router.get("/callback", async (req, res) => {
  const code = req.query.code;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
          "base64"
        ),
    },
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    },
    json: true,
  };

  try {
    const response = await axios.post(authOptions.url, authOptions.form, {
      headers: authOptions.headers,
    });
    const accessToken = response.data.access_token;

    // Generate JWT token
    const token = jwt.sign({ accessToken }, jwtSecret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: "Failed to authenticate" });
  }
});

module.exports = router;
