const connection = require("../../Helper/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const fs = require("fs");

module.exports = {
  // Create a new seller

  // regSeller: async (req, res) => {
  //   console.log("Inside Register as Seller!!!");

  //   try {
  //     const {
  //       name,
  //       address,
  //       email,
  //       password,
  //       phonenumber,
  //       account_name,
  //       acc_no,
  //       branch,
  //       ifsc_code,
  //       company_name,
  //       gst_no,
  //       pancard_no,
  //       aadhaar_no,
  //       pincode,
  //     } = req.body;

  //     // Access uploaded files via req.files
  //     const company_logo = req.files["company_logo"][0].filename;     
  //     console.log(req.files);
   

  //     // Hash the password
  //     const hashedPassword = await bcrypt.hash(password, saltRounds);

  //     const insertQuery = `
  //       INSERT INTO seller 
  //       (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, 
  //       company_logo, company_name, gst_no, pancard_no, aadhaar_no, pincode) 
  //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  //     `;

  //     const result = await connection.query(insertQuery, [
  //       name,
  //       address,
  //       email,
  //       hashedPassword,
  //       phonenumber,
  //       account_name,
  //       acc_no,
  //       branch,
  //       ifsc_code,
  //       company_logo,
  //       company_name,
  //       gst_no,
  //       pancard_no,
  //       aadhaar_no,
  //       pincode,
  //     ]);

  //     console.log("Seller registered successfully");

  //     // Fetch the inserted data after the insertion
  //     const insertedDataQuery = `
  //       SELECT * FROM seller WHERE seller_id = ?
  //     `;

  //     const selectedData = await connection.query(insertedDataQuery, [
  //       result.insertId,
  //     ]);

  //     res.status(200).json({
  //       message: "Seller registered successfully",
  //       result: selectedData[0], // Sending the inserted data in the response
  //     });
  //   } catch (error) {
  //     console.error("Error registering seller:", error.message);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  regSeller: (req, res) => {
    console.log("Inside Register as Seller!!!");

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
        company_name,
        gst_no,
        pancard_no,
        aadhaar_no,
        pincode,
      } = req.body;

      // Access uploaded files via req.files
      const company_logo = req.files["company_logo"][0].filename;
      console.log(req.files);

      // Hash the password
      bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error("Error hashing password:", hashErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const insertQuery = `
          INSERT INTO seller 
          (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, 
          company_logo, company_name, gst_no, pancard_no, aadhaar_no, pincode) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(insertQuery, [
          name,
          address,
          email,
          hashedPassword,
          phonenumber,
          account_name,
          acc_no,
          branch,
          ifsc_code,
          company_logo,
          company_name,
          gst_no,
          pancard_no,
          aadhaar_no,
          pincode,
        ], (queryErr, result) => {
          if (queryErr) {
            console.error("Error registering seller:", queryErr.message);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          console.log("Seller registered successfully");

          // Fetch the inserted data after the insertion
          const insertedDataQuery = `
            SELECT * FROM seller WHERE seller_id = ?
          `;

          connection.query(insertedDataQuery, [result.insertId], (selectErr, selectedData) => {
            if (selectErr) {
              console.error("Error fetching inserted data:", selectErr.message);
              return res.status(500).json({ error: "Internal Server Error" });
            }

            res.status(200).json({
              message: "Seller registered successfully",
              result: selectedData[0],
            });
          });
        });
      });
    } catch (error) {
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
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
  updateSellerById: async (req, res) => {
    console.log("Inside Update Seller By Id!!!");

    try {
      const sellerId = req.params.id;
      const {
        name,
        address,
        email,
        phonenumber,
        account_name,
        acc_no,
        branch,
        ifsc_code,
        company_name,
        gst_no,
        pancard_no,
        aadhaar_no,
        pincode,
      } = req.body;

      // Access uploaded files via req.files
      const companyLogo = req.files["companyLogo"] && req.files["companyLogo"][0];

      // Get the existing company logo path from the database
      const selectLogoQuery = "SELECT company_logo_path FROM seller WHERE seller_id = ?";
      const existingLogoResult = await connection.query(selectLogoQuery, [sellerId]);
      const existingLogoPath = existingLogoResult[0].company_logo_path;

      // Update the seller in the seller table
      let updateQuery, queryParams;

      if (companyLogo) {
        // If a new company logo is provided, update the logo path as well
        const companyLogoPath = companyLogo.path;

        updateQuery = `
          UPDATE seller 
          SET 
            name = ?, 
            address = ?, 
            email = ?, 
            phonenumber = ?, 
            account_name = ?, 
            acc_no = ?, 
            branch = ?, 
            ifsc_code = ?, 
            company_name = ?, 
            gst_no = ?, 
            pancard_no = ?, 
            aadhaar_no = ?, 
            pincode = ?,
            company_logo_path = ?
          WHERE seller_id = ?
        `;

        queryParams = [
          name,
          address,
          email,
          phonenumber,
          account_name,
          acc_no,
          branch,
          ifsc_code,
          company_name,
          gst_no,
          pancard_no,
          aadhaar_no,
          pincode,
          companyLogoPath,
          sellerId,
        ];

        // Remove the existing company logo file
        if (existingLogoPath) {
          fs.unlinkSync(existingLogoPath);
        }
      } else {
        // If no new company logo is provided, update other fields only
        updateQuery = `
          UPDATE seller 
          SET 
            name = ?, 
            address = ?, 
            email = ?, 
            phonenumber = ?, 
            account_name = ?, 
            acc_no = ?, 
            branch = ?, 
            ifsc_code = ?, 
            company_name = ?, 
            gst_no = ?, 
            pancard_no = ?, 
            aadhaar_no = ?, 
            pincode = ?,
            company_logo_path = ?
          WHERE seller_id = ?
        `;

        queryParams = [
          name,
          address,
          email,
          phonenumber,
          account_name,
          acc_no,
          branch,
          ifsc_code,
          company_name,
          gst_no,
          pancard_no,
          aadhaar_no,
          pincode,
          existingLogoPath, // Use the existing logo path in the update query
          sellerId,
        ];
      }

      const result = await connection.query(updateQuery, queryParams);

      console.log("Seller updated successfully");
      res.status(200).json({
        message: "Seller updated successfully",
        result,
      });
    } catch (error) {
      console.error("Error updating seller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Delete a seller by ID
  deleteSellerById: async (req, res) => {
    console.log("Inside Delete Seller By Id!!!");

    const sellerId = req.params.id;
    const deleteQuery = "DELETE FROM seller WHERE seller_id = ?";

    try {
      const result = await connection.query(deleteQuery, [sellerId]);

      if (result.affectedRows > 0) {
        console.log("Seller deleted successfully");
        res.status(200).json({ message: "Seller deleted successfully" });
      } else {
        console.log("Seller not found");
        res.status(404).json({ message: "Seller not found" });
      }
    } catch (error) {
      console.error("Error deleting seller by id:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
