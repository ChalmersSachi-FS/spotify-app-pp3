const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SPOTIFY_API_URL = "https://api.spotify.com/v1";

router.get("/search", async (req, res) => {
  const { query, type } = req.query;
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { access_token } = jwt.verify(token, process.env.JWT_SECRET);
    const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { q: query, type },
    });

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search failed" });
  }
});
