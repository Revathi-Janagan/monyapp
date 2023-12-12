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
      return res.status(400).json({ error: "Invalid Token" });
    }
    req.user = decoded;
    next();
  });
};
