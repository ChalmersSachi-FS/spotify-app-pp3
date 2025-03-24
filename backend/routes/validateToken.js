const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ valid: false, message: "Invalid or expired token" });
  }
};

module.exports = validateJwt;
