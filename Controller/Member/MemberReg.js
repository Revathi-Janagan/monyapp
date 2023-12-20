const connection = require("../../Helper/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = {
  // Create a new member
  regMemb: async (req, res) => {
    console.log("Inside Register as Member!!!");

    try {
      const {
        name,
        address,
        email,
        password,
        phonenumber,
        account_name,
        acc_no,
        branch,
        ifsc_code,
        pancard_no,
        aadhaar_no,
        pincode,
        parent_id, // Assuming this is provided by your genealogy tree logic
      } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert the new member into the member table
      const insertQuery = `
        INSERT INTO member 
        (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, pancard_no, aadhaar_no, pincode, parent_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const result = await connection.query(insertQuery, [
        name,
        address,
        email,
        hashedPassword,
        phonenumber,
        account_name,
        acc_no,
        branch,
        ifsc_code,
        pancard_no,
        aadhaar_no,
        pincode,
        parent_id,
      ]);

      console.log("Member registered successfully");
      res.status(200).json({
        message: "Member registered successfully",
        result,
      });
    } catch (error) {
      console.error("Error registering member:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get all members
  getAllMemb: (req, res) => {
    console.log("Inside Get All Members!!!");

    const selectQuery = "SELECT * FROM member";

    connection.query(selectQuery, (err, result) => {
      if (err) {
        console.error("Error getting all members:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Fetched all members successfully");
        res.status(200).json(result);
      }
    });
  },

  // Get a member by ID
  getMembById: (req, res) => {
    console.log("Inside Get Member By Id!!!");

    const memberId = req.params.id;
    const selectQuery = "SELECT * FROM member WHERE memb_id = ?";

    connection.query(selectQuery, [memberId], (err, result) => {
      if (err) {
        console.error("Error getting member by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.length > 0) {
          console.log("Fetched member by id successfully");
          res.status(200).json(result[0]);
        } else {
          console.log("Member not found");
          res.status(404).json({ message: "Member not found" });
        }
      }
    });
  },

  // Update a member by ID
  updateMembById: (req, res) => {
    console.log("Inside Update Member By Id!!!");

    const memberId = req.params.id;
    const {
      name,
      address,
      email,
      password,
      phonenumber,
      account_name,
      acc_no,
      branch,
      ifsc_code,
      aadhaar_no,
      pincode,
    } = req.body;

    // Check if pancard images are included in the update
    let updateFields = "";
    const updateValues = [
      name,
      address,
      email,
      password,
      phonenumber,
      account_name,
      acc_no,
      branch,
      ifsc_code,
      aadhaar_no,
      pincode,
      memberId, // The last element is the memberId for the WHERE clause
    ];

    if (
      req.files &&
      req.files["pancardFrontImage"] &&
      req.files["pancardBackImage"]
    ) {
      const pancardFrontImage = req.files["pancardFrontImage"][0];
      const pancardBackImage = req.files["pancardBackImage"][0];

      const pancardFrontImagePath = pancardFrontImage.path;
      const pancardBackImagePath = pancardBackImage.path;

      updateFields = `pancard_front_image = ?, pancard_back_image = ?, `;
      updateValues.unshift(pancardFrontImagePath, pancardBackImagePath);
    }

    const updateQuery = `UPDATE member SET 
      ${updateFields}
      name = ?, address = ?, email = ?, password = ?, phonenumber = ?, 
      account_name = ?, acc_no = ?, branch = ?, ifsc_code = ?, 
      aadhaar_no = ?, pincode = ? 
      WHERE memb_id = ?`;

    connection.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error("Error updating member by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.affectedRows > 0) {
          console.log("Member updated successfully");
          res.status(200).json({ message: "Member updated successfully" });
        } else {
          console.log("Member not found");
          res.status(404).json({ message: "Member not found" });
        }
      }
    });
  },

  // Delete a member by ID
  deleteMembById: (req, res) => {
    console.log("Inside Delete Member By Id!!!");

    const memberId = req.params.id;
    const deleteQuery = "DELETE FROM member WHERE memb_id = ?";

    connection.query(deleteQuery, [memberId], (err, result) => {
      if (err) {
        console.error("Error deleting member by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.affectedRows > 0) {
          console.log("Member deleted successfully");
          res.status(200).json({ message: "Member deleted successfully" });
        } else {
          console.log("Member not found");
          res.status(404).json({ message: "Member not found" });
        }
      }
    });
  },
};
