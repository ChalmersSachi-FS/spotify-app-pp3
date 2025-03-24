const axios = require("axios");
const jwt = require("jsonwebtoken");
const querystring = require("querystring");
require("dotenv").config();

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  JWT_SECRET,
} = process.env;

// Store refresh tokens in memory (for simplicity) or use a database
const userTokens = {};

// Function to generate JWT
const generateJwt = (spotifyAccessToken, spotifyRefreshToken) => {
  return jwt.sign({ spotifyAccessToken, spotifyRefreshToken }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Spotify Login Route (Redirects user to Spotify login)
const login = (req, res) => {
  const scope = "user-read-private user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify(
    {
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID,
      scope,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }
  )}`;
  res.redirect(authUrl);
};

// Callback Route (Exchanges Spotify auth code for an access token)
const callback = async (req, res) => {
  const code = req.query.code;
  if (!code)
    return res.status(400).json({ error: "Authorization code missing" });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token } = response.data;
    userTokens[refresh_token] = access_token; // Store tokens

    // Generate JWT
    const jwtToken = generateJwt(access_token, refresh_token);

    res.json({ jwtToken });
  } catch (error) {
    console.error("Error exchanging code:", error);
    res.status(500).json({ error: "Failed to exchange code for token" });
  }
};

// Refresh JWT using Spotify Refresh Token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "Refresh token required" });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = response.data;
    userTokens[refreshToken] = access_token; // Updates token storage

    // Generate new JWT
    const jwtToken = generateJwt(access_token, refreshToken);

    res.json({ jwtToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Failed to refresh token" });
  }
};

module.exports = { login, callback, refreshToken };
