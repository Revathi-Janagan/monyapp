const connection = require("../../Helper/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = {
  // Create a new member

  // regMemb: (req, res) => {
  //   console.log("Inside Register as Member!!!");

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
  //       pancard_no,
  //       aadhaar_no,
  //       pincode,
  //       parent_id, // Assuming this is provided by your genealogy tree logic
  //     } = req.body;

  //     // Hash the password
  //     bcrypt.hash(password, saltRounds, (hashError, hashedPassword) => {
  //       if (hashError) {
  //         console.error("Error hashing password:", hashError.message);
  //         res.status(500).json({ error: "Internal Server Error" });
  //         return;
  //       }

  //       // Insert the new member into the member table
  //       const insertQuery = `
  //         INSERT INTO member
  //         (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, pancard_no, aadhaar_no, pincode, parent_id)
  //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  //       `;

  //       connection.query(
  //         insertQuery,
  //         [
  //           name,
  //           address,
  //           email,
  //           hashedPassword,
  //           phonenumber,
  //           account_name,
  //           acc_no,
  //           branch,
  //           ifsc_code,
  //           pancard_no,
  //           aadhaar_no,
  //           pincode,
  //           parent_id,
  //         ],
  //         async (queryError, result) => {
  //           if (queryError) {
  //             console.error("Error registering member:", queryError.message);
  //             res.status(500).json({ error: "Internal Server Error" });
  //           } else {
  //             // Fetch the inserted data after the insertion
  //             const insertedDataQuery = `
  //               SELECT * FROM member WHERE memb_id = ?
  //             `;

  //             connection.query(insertedDataQuery, [result.insertId], (selectError, selectedData) => {
  //               if (selectError) {
  //                 console.error("Error fetching inserted data:", selectError.message);
  //                 res.status(500).json({ error: "Internal Server Error" });
  //               } else {
  //                 console.log("Member registered successfully");
  //                 res.status(200).json({
  //                   message: "Member registered successfully",
  //                   result: selectedData[0], // Sending the inserted data in the response
  //                 });
  //               }

  //               // Close the connection after executing the queries

  //             });
  //           }
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.error("Error registering member:", error.message);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },

  regMemb: (req, res) => {
    console.log("Inside Register as Member!!!");
    const MAX_DASHBOARD_MEMBERS = 3; // Set the maximum number of members allowed via the dashboard

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

      // Check if the member is trying to add via the dashboard
      const isAddingViaDashboard = !parent_id;

      // If the member is trying to add via the dashboard, limit to the first three members
      if (isAddingViaDashboard) {
        // Check if the number of dashboard members exceeds the limit
        const countDashboardMembersQuery = `
        SELECT COUNT(*) as dashboardMemberCount FROM member WHERE parent_id IS NULL;`;

        connection.query(
          countDashboardMembersQuery,
          (countError, countResult) => {
            if (countError) {
              console.error(
                "Error counting dashboard members:",
                countError.message
              );
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              const dashboardMemberCount = countResult[0].dashboardMemberCount;

              if (dashboardMemberCount < MAX_DASHBOARD_MEMBERS) {
                // Hash the password
                bcrypt.hash(
                  password,
                  saltRounds,
                  (hashError, hashedPassword) => {
                    if (hashError) {
                      console.error(
                        "Error hashing password:",
                        hashError.message
                      );
                      res.status(500).json({ error: "Internal Server Error" });
                      return;
                    }

                    // Insert the new member into the member table
                    const insertQuery = `
                  INSERT INTO member 
                  (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, pancard_no, aadhaar_no, pincode, parent_id) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

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
                        pancard_no,
                        aadhaar_no,
                        pincode,
                        parent_id,
                      ],
                      async (queryError, result) => {
                        if (queryError) {
                          console.error(
                            "Error registering member:",
                            queryError.message
                          );
                          res
                            .status(500)
                            .json({ error: "Internal Server Error" });
                        } else {
                          // Fetch the inserted data after the insertion
                          const insertedDataQuery = `
                        SELECT * FROM member WHERE memb_id = ?
                      `;

                          connection.query(
                            insertedDataQuery,
                            [result.insertId],
                            (selectError, selectedData) => {
                              if (selectError) {
                                console.error(
                                  "Error fetching inserted data:",
                                  selectError.message
                                );
                                res
                                  .status(500)
                                  .json({ error: "Internal Server Error" });
                              } else {
                                console.log("Member registered successfully");
                                res.status(200).json({
                                  message: "Member registered successfully",
                                  result: selectedData[0], // Sending the inserted data in the response
                                });
                              }                             
                            }
                          );
                        }
                      }
                    );
                  }
                );
              } else {
                // If the limit is exceeded, reject the request
                console.error("Limit reached for members added via dashboard.");
                res
                  .status(403)
                  .json({ error: "Dashboard Member Limit Exceeded" });      
                             
              }
            }
          }
        );
      }
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
    console.log("Member id is,", memberId);
    const selectQuery = "SELECT * FROM member WHERE memb_id = ?";

    connection.query(selectQuery, [memberId], (err, result) => {
      if (err) {
        console.error("Error getting member by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.length > 0) {
          console.log("Fetched member by id successfully");
          res.status(200).json({
            message: "Fetched member by id successfully",
            member: result[0],
          });
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
      newPassword, // Use a different variable for the new password
      phonenumber,
      account_name,
      acc_no,
      branch,
      ifsc_code,
      pancard_no,
      aadhaar_no,
      pincode,
    } = req.body;

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);

    const updateQuery = `
      UPDATE member
      SET 
        name = ?,
        address = ?,
        email = ?,
        password = ?,
        phonenumber = ?,
        account_name = ?,
        acc_no = ?,
        branch = ?,
        ifsc_code = ?,
        pancard_no = ?,
        aadhaar_no = ?,
        pincode = ?
      WHERE memb_id = ?
    `;

    connection.query(
      updateQuery,
      [
        name,
        address,
        email,
        hashedPassword, // Use the hashed password in the query
        phonenumber,
        account_name,
        acc_no,
        branch,
        ifsc_code,
        pancard_no,
        aadhaar_no,
        pincode,
        memberId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating member by id:", err.message);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Updated member by id successfully");
          res.status(200).json({
            message: "Updated member by id successfully",
            result,
          });
        }
      }
    );
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
