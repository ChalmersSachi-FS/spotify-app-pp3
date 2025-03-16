import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/token");
      setToken(response.data.jwt);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSearch = async () => {
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: searchQuery, type: "track" },
      });

      setResults(response.data.tracks.items);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Spotify Music Search</h1>
      <button onClick={handleLogin}>Log in</button>
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.length > 0 ? (
          results.map((track) => (
            <div key={track.id}>
              <img
                src={track.album.images[0].url}
                alt={track.name}
                width="100"
              />
              <p>
                {track.name} by {track.artists[0].name}
              </p>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Play on Spotify
              </a>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default App;
