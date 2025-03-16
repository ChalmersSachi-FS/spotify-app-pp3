const axios = require("axios");

const getSpotifyToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
  params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/tokens",
      params
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token", error);
    return null;
  }
};

module.exports = { getSpotifyToken };
