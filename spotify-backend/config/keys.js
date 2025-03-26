require("dotenv").config();

module.exports = {
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
};
