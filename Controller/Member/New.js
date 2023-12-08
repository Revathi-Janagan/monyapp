const connection = require("../../Helper/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = {
  // Create a new member
  regMemb: (req, res) => {
    console.log("Inside Register as Member!!!");
  
    const {
      name,
      address,
      email,
      password,  // Plain text password
      phonenumber,
      account_name,
      acc_no,
      branch,
      ifsc_code,
      aadhaar_no,
      pincode,
      pancard_front_image,
      pancard_back_image
    } = req.body;
  
    // Hash the password asynchronously
    bcrypt.hash(password, saltRounds, (hashError, hashedPassword) => {
      if (hashError) {
        console.error("Error hashing password:", hashError);
        return res
          .status(500)
          .json({ message: "An error occurred while hashing the password." });
      }
  
      // // Access uploaded files via req.files
      // const pancardFrontImage = req.files["pancardFrontImage"][0];
      // const pancardBackImage = req.files["pancardBackImage"][0];
  
      // // Store the file paths in the database or perform other operations
      // const pancardFrontImagePath = pancardFrontImage.path;
      // const pancardBackImagePath = pancardBackImage.path;
  
      const insertQuery = `INSERT INTO member 
        (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, 
        pancard_front_image, pancard_back_image, aadhaar_no, pincode) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
      connection.query(
        insertQuery,
        [
          name,
          address,
          email,
          hashedPassword,  // Store the hashed password in the database
          phonenumber,
          account_name,
          acc_no,
          branch,
          ifsc_code,
          // pancardFrontImagePath,          
          // pancardBackImagePath,
          pancard_front_image, 
          pancard_back_image,
          aadhaar_no,
          pincode,
        ],
        (err, result) => {
          if (err) {
            console.error("Error registering member:", err.message);
            return res.status(500).json({ error: "Internal Server Error" });
          }
  
          console.log("Member registered successfully");
          res
            .status(200)
            .json({ message: "Member registered successfully", result });
        }
      );
    });
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
