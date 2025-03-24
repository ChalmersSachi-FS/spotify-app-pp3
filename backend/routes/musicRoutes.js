const express = require("express");
const router = express.Router();
const axios = require("axios");

// Search Music or Artists
router.get("/search", async (req, res) => {
  const { query, token } = req.query;

  if (!query || !token) {
    return res.status(400).json({ error: "Missing query or token" });
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=artist,track`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch music data" });
  }
});

module.exports = router;
