const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../Config/config");
const connection = require("../Helper/db");

// Middleware for verifying tokens
module.exports.verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const options = {
    expiresIn: "12h",
  };

  if (!token) {
    return res.status(400).json({ error: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, ACCESS_TOKEN, options, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err.message);
      return res.status(400).json({ error: "Invalid Token" });
    }
    req.user = decoded;
    next();
  });
};

// Middleware for verifying if the user is a member
module.exports.verifyMember = (req, res, next) => {
  if (req.user && req.user.userType === "member") {
    // User is a member
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: Access denied for this user" });
  }
};