const connection = require("../../Helper/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = {
  // Create a new seller
  regSeller: (req, res) => {
    console.log("Inside Register as Seller!!!");

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
      company_name,
      gst_no,
      aadhaar_no,
      pincode,
      company_logo,
      pancard_front_image, 
      pancard_back_image,
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
    // const companyLogo = req.files["companyLogo"][0];

    // // Store the file paths in the database or perform other operations
    // const pancardFrontImagePath = pancardFrontImage.path;
    // const pancardBackImagePath = pancardBackImage.path;
    // const companyLogoPath = companyLogo.path;

    const insertQuery = `INSERT INTO seller 
      (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, 
      company_logo, company_name, gst_no, pancard_front_image, pancard_back_image, aadhaar_no, pincode) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      insertQuery,
      [
        name,
        address,
        email,
        hashedPassword,
        phonenumber,
        account_name,
        acc_no,
        branch,
        ifsc_code,
        // companyLogoPath,
        company_logo,
        company_name,
        gst_no,
        // pancardFrontImagePath,
        // pancardBackImagePath,
        pancard_front_image,
        pancard_back_image,
        aadhaar_no,
        pincode,
      ],
      (err, result) => {
        if (err) {
          console.error("Error registering seller:", err.message);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Seller registered successfully");
          res
            .status(200)
            .json({ message: "Seller registered successfully", result });
        }
      }
    );
  });
},

  // Get all sellers
  getAllSellers: (req, res) => {
    console.log("Inside Get All Sellers!!!");

    const selectQuery = "SELECT * FROM seller";

    connection.query(selectQuery, (err, result) => {
      if (err) {
        console.error("Error getting all sellers:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Fetched all sellers successfully");
        res.status(200).json(result);
      }
    });
  },

  // Get a seller by ID
  getSellerById: (req, res) => {
    console.log("Inside Get Seller By Id!!!");

    const sellerId = req.params.id;
    const selectQuery = "SELECT * FROM seller WHERE seller_id = ?";

    connection.query(selectQuery, [sellerId], (err, result) => {
      if (err) {
        console.error("Error getting seller by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.length > 0) {
          console.log("Fetched seller by id successfully");
          res.status(200).json(result[0]);
        } else {
          console.log("Seller not found");
          res.status(404).json({ message: "Seller not found" });
        }
      }
    });
  },

  // Update a seller by ID
  updateSellerById: (req, res) => {
    console.log("Inside Update Seller By Id!!!");

    const sellerId = req.params.id;
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
      company_name,
      gst_no,
      aadhaar_no,
      pincode,
    } = req.body;

    // Check if pancard and company logo images are included in the update
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
      company_name,
      gst_no,
      aadhaar_no,
      pincode,
      sellerId, // The last element is the sellerId for the WHERE clause
    ];

    if (
      req.files &&
      req.files["pancardFrontImage"] &&
      req.files["pancardBackImage"] &&
      req.files["companyLogo"]
    ) {
      const pancardFrontImage = req.files["pancardFrontImage"][0];
      const pancardBackImage = req.files["pancardBackImage"][0];
      const companyLogo = req.files["companyLogo"][0];

      const pancardFrontImagePath = pancardFrontImage.path;
      const pancardBackImagePath = pancardBackImage.path;
      const companyLogoPath = companyLogo.path;

      updateFields = `pancard_front_image = ?, pancard_back_image = ?, company_logo = ?, `;
      updateValues.unshift(pancardFrontImagePath, pancardBackImagePath, companyLogoPath);
    }

    const updateQuery = `UPDATE seller SET 
      ${updateFields}
      name = ?, address = ?, email = ?, password = ?, phonenumber = ?, 
      account_name = ?, acc_no = ?, branch = ?, ifsc_code = ?, 
      company_name = ?, gst_no = ?, aadhaar_no = ?, pincode = ? 
      WHERE seller_id = ?`;

    connection.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error("Error updating seller by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.affectedRows > 0) {
          console.log("Seller updated successfully");
          res.status(200).json({ message: "Seller updated successfully" });
        } else {
          console.log("Seller not found");
          res.status(404).json({ message: "Seller not found" });
        }
      }
    });
  },

  // Delete a seller by ID
  deleteSellerById: (req, res) => {
    console.log("Inside Delete Seller By Id!!!");

    const sellerId = req.params.id;
    const deleteQuery = "DELETE FROM seller WHERE seller_id = ?";

    connection.query(deleteQuery, [sellerId], (err, result) => {
      if (err) {
        console.error("Error deleting seller by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.affectedRows > 0) {
          console.log("Seller deleted successfully");
          res.status(200).json({ message: "Seller deleted successfully" });
        } else {
          console.log("Seller not found");
          res.status(404).json({ message: "Seller not found" });
        }
      }
    });
  },
};
