const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../../Middlewares/TokenVerification");
const connection = require("../../Helper/db");

module.exports = {
  addMemberUnderTree: (req, res) => {
    const { newMemberDetails } = req.body;

    try {
      // Get the decoded user information from the token
      const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);

      if (!decodedToken || !decodedToken.userId) {
        console.error("Invalid request - User not logged in");
        return res.status(400).json({ error: "User not logged in" });
      }

      const loggedInUserId = decodedToken.userId;
      const parentUserId = decodedToken.userId; // Assuming this field is present in the decoded token
      console.log("Parent ID is", parentUserId);

      // Check if newMemberDetails is provided and has the required properties
      if (!newMemberDetails ) {
        console.error("Invalid request - Missing required member details");
        return res.status(400).json({ error: "Invalid request - Missing required member details" });
      }

      const insertMemberQuery = `
        INSERT INTO member (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, pancard_no, aadhaar_no, pincode, parent_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

      connection.query(
        insertMemberQuery,
        [
          newMemberDetails.name,
          newMemberDetails.address,
          newMemberDetails.email,
          newMemberDetails.password,
          newMemberDetails.phonenumber,
          newMemberDetails.account_name,
          newMemberDetails.acc_no,
          newMemberDetails.branch,
          newMemberDetails.ifsc_code,
          newMemberDetails.pancard_no,
          newMemberDetails.aadhaar_no,
          newMemberDetails.pincode,
          parentUserId, // Set the parent_id for the new member using userParentId from the token
        ],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error adding new member:", insertErr.message);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const newMemberId = insertResult.insertId;

            const insertTreeQuery = `
              INSERT INTO genealogy_tree (ancestor_id, descendant_id)
              VALUES (?, ?);
            `;

            connection.query(
              insertTreeQuery,
              [parentUserId, newMemberId], // Use parentUserId from the token as ancestor_id
              (treeInsertErr, treeInsertResult) => {
                if (treeInsertErr) {
                  console.error("Error adding member to genealogy tree:", treeInsertErr.message);
                  res.status(500).json({ error: "Internal Server Error" });
                } else {
                  res.status(200).json({
                    message: "Member and relationship added successfully",
                    treeInsertResult,
                  });
                }
              }
            );
          }
        }
      );
    } catch (error) {
      console.error("Error adding member under genealogy tree:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
