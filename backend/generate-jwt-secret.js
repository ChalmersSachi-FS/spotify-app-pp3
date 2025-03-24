const crypto = require("crypto");

// Generate a random 256-bit (32 bytes) secret in base64 encoding
const jwtSecret = crypto.randomBytes(32).toString("base64");
console.log(jwtSecret);
