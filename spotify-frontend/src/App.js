import React, { useState } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5001/api/search?query=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResults(response.data.tracks?.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch search results.");
    }
  };

  return (
    <div>
      <h1>Spotify Music Search</h1>
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a song..."
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((track) => (
            <div key={track.id}>
              {track.album.images.length > 0 && (
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  width="100"
                />
              )}
              <p>
                {track.name} by {track.artists[0]?.name}
              </p>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen on Spotify
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
