// backend/routes/authenticate.js

const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/authenticate", async (req, res) => {
  const { code } = req.body; // Spotify authorization code from frontend
  try {
    // authorization code for a token
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          code,
          redirect_uri: "http://localhost:3000/callback",
          grant_type: "authorization_code",
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            "ca4c337e4ab94ed29cdc892cd3053840:99976ba038094c41be2ad05e65c7c872"
          ).toString("base64")}`,
        },
      }
    );

    res.json({ token: response.data.access_token }); // Sends token back to frontend
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
});

module.exports = router;
