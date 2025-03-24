const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// Define the /api/authenticate route
app.post("/api/authenticate", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  authenticateWithSpotify(code)
    .then((response) => {
      res
        .status(200)
        .json({ message: "Authentication successful", data: response });
    })
    .catch((error) => {
      res.status(500).json({ error: "Authentication failed", details: error });
    });
});

const authenticateWithSpotify = async (code) => {
  return new Promise((resolve, reject) => {
    if (code === "valid_code") {
      resolve({ token: "spotify_token" });
    } else {
      reject(new Error("Invalid code"));
    }
  });
};

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
