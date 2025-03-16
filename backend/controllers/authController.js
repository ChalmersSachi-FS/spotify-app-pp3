const axios = require("axios");
const jwt = require("jsonwebtoken");
const { getSpotifyToken } = require("../config/spotify");

exports.login = async (req, res) => {
  const token = jwt.sign({ user: "guest" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true });
  res.json({ success: true, token });
};

exports.getSpotifyData = async (req, res) => {
  try {
    const token = await getSpotifyToken();
    if (!token) return res.status(500).json({ error: "Failed to fetch token" });

    const response = await axios.get(
      "https:api.spotify.com/v1/browse/new-releases",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
