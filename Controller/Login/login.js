const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN } = require("../../Config/config");
const connection = require("../../Helper/db");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  const sellerSelectQuery = `SELECT * FROM seller WHERE email = ?`;
  const memberSelectQuery = `SELECT * FROM member WHERE email = ?`;

  connection.query(sellerSelectQuery, [email], (sellerErr, sellerResults) => {
    if (sellerErr) {
      console.error("Error during seller login:", sellerErr.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    connection.query(memberSelectQuery, [email], (memberErr, memberResults) => {
      if (memberErr) {
        console.error("Error during member login:", memberErr.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const sellerUser = sellerResults[0];
      const memberUser = memberResults[0];

      if (!sellerUser && !memberUser) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = sellerUser || memberUser;
      const userType = sellerUser ? "seller" : "member";
      const idField = sellerUser ? "seller_id" : "member_id";

      // Check if the provided password matches the stored hashed password
      bcrypt.compare(password, user.password, (compareError, match) => {
        if (compareError) {
          console.error("Error comparing passwords:", compareError);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!match) {
          return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate and send JWT token
        const token = jwt.sign(
          { userId: user[idField], userType },
          ACCESS_TOKEN,
          { expiresIn: "12h" }
        );
        res.status(200).json({ message: "Login successful", token });
      });
    });
  });
};
