const connection = require("../../Helper/db"); // Import your database connection

const genealogyController = {
  // Add a new member under the genealogy tree
  addMemberUnderTree: (req, res) => {
    const { parentMemberId, newMemberDetails } = req.body;

    // Check the number of existing descendants for the parent member
    const countDescendantsQuery = `
      SELECT COUNT(*) as descendantCount
      FROM genealogy_tree
      WHERE ancestor_id = ?;
    `;

    connection.query(
      countDescendantsQuery,
      [parentMemberId],
      (countErr, countResult) => {
        if (countErr) {
          console.error("Error counting descendants:", countErr.message);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          const descendantCount = countResult[0].descendantCount;

          if (descendantCount < 10) {
            // Step 1: Insert the new member into the member table
            const insertMemberQuery = `
  INSERT INTO member (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, pancard_no, aadhaar_no, pincode, parent_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

            connection.query(
              insertMemberQuery,
              [
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
                  parentMemberId, // Set the parent_id for the new member
                ],
              ],
              (insertErr, insertResult) => {
                if (insertErr) {
                  console.error("Error adding new member:", insertErr.message);
                  res.status(500).json({ error: "Internal Server Error" });
                } else {
                  // Get the memb_id of the newly inserted member
                  const newMemberId = insertResult.insertId;

                  // Step 2: Insert the relationship into the genealogy_tree table
                  const insertTreeQuery = `
                  INSERT INTO genealogy_tree (ancestor_id, descendant_id)
                  VALUES (?, ?);
                `;

                  connection.query(
                    insertTreeQuery,
                    [parentMemberId, newMemberId],
                    (treeInsertErr, treeInsertResult) => {
                      if (treeInsertErr) {
                        console.error(
                          "Error adding member to genealogy tree:",
                          treeInsertErr.message
                        );
                        res
                          .status(500)
                          .json({ error: "Internal Server Error" });
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
          } else {
            res.status(400).json({
              error: "Genealogy tree limit reached for the parent member.",
            });
          }
        }
      }
    );
  },
};

module.exports = genealogyController;
