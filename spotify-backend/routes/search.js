const express = require("express");
const axios = require("axios");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Search for a song
router.get("/search", verifyToken, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: { Authorization: `Bearer ${req.user.accessToken}` },
      params: { q: query, type: "track" },
    });

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch results" });
  }
});

module.exports = router;
