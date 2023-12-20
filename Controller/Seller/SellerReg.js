const connection = require("../../Helper/db");

module.exports = {
  // Create a new seller

  regSeller: async (req, res) => {
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
      const companyLogo = req.files["companyLogo"][0];

      // Store the file paths in the database or perform other operations
      const companyLogoPath = companyLogo.path;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const insertQuery = `
          INSERT INTO seller 
          (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, 
          company_logo_path, company_name, gst_no, pancard_no, aadhaar_no, pincode) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        companyLogoPath,
        company_name,
        gst_no,
        pancard_no,
        aadhaar_no,
        pincode,
      ]);

      console.log("Seller registered successfully");
      res.status(200).json({
        message: "Seller registered successfully",
        result,
      });
    } catch (error) {
      console.error("Error registering seller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get all sellers

  getAllSellers: async (req, res) => {
    console.log("Inside Get All Sellers!!!");

    try {
      const selectQuery = "SELECT * FROM seller";
      const result = await connection.query(selectQuery);

      console.log("Fetched all sellers successfully");
      res.status(200).json(result);
    } catch (error) {
      console.error("Error getting all sellers:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get a seller by ID

  getSellerById: async (req, res) => {
    console.log("Inside Get Seller By Id!!!");

    const sellerId = req.params.id;
    const selectQuery = "SELECT * FROM seller WHERE seller_id = ?";

    try {
      const result = await connection.query(selectQuery, [sellerId]);

      if (result.length > 0) {
        console.log("Fetched seller by id successfully");
        res.status(200).json(result[0]);
      } else {
        console.log("Seller not found");
        res.status(404).json({ message: "Seller not found" });
      }
    } catch (error) {
      console.error("Error getting seller by id:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Update a seller by ID
  updateSellerById: async (req, res) => {
    console.log("Inside Update Seller By Id!!!");

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
      aadhaar_no,
      pincode,
    } = req.body;

    try {
      // Check if company logo image is included in the update
      let updateFields = "";
      const updateValues = [
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
        aadhaar_no,
        pincode,
        sellerId, // The last element is the sellerId for the WHERE clause
      ];

      if (req.files && req.files["companyLogo"]) {
        const companyLogo = req.files["companyLogo"][0];
        const companyLogoPath = companyLogo.path;

        updateFields = `company_logo_path = ?, `;
        updateValues.unshift(companyLogoPath);
      }

      const updateQuery = `
          UPDATE seller SET 
          ${updateFields}
          name = ?, address = ?, email = ?, phonenumber = ?, 
          account_name = ?, acc_no = ?, branch = ?, ifsc_code = ?, 
          company_name = ?, gst_no = ?, aadhaar_no = ?, pincode = ? 
          WHERE seller_id = ?
      `;

      const result = await connection.query(updateQuery, updateValues);

      if (result.affectedRows > 0) {
        console.log("Seller updated successfully");
        res.status(200).json({ message: "Seller updated successfully" });
      } else {
        console.log("Seller not found");
        res.status(404).json({ message: "Seller not found" });
      }
    } catch (error) {
      console.error("Error updating seller by id:", error.message);
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
