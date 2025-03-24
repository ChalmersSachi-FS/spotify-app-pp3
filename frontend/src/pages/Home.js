import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [authCode, setAuthCode] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const authenticateSpotify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/authenticate",
        {
          code: authCode, // Make sure you're sending the correct code
        }
      );
      setAuthMessage("Authentication successful!");
      console.log("Spotify Authentication Response:", response);
    } catch (error) {
      setAuthMessage("Authentication failed");
      console.error("Authentication Error:", error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <input
        type="text"
        placeholder="Enter Spotify Auth Code"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
      />
      <button onClick={authenticateSpotify}>Authenticate</button>
      {authMessage && <p>{authMessage}</p>}
    </div>
  );
}

export default Home;
