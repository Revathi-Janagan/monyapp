const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN } = require("../../Middlewares/TokenVerification");
const connection = require("../../Helper/db");

module.exports = {
  addMemberUnderTree: async (req, res) => {
    try {
      // Get the decoded user information from the token
      const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);

      if (!decodedToken || !decodedToken.userId) {
        console.error("Invalid request - User not logged in");
        return res.status(400).json({ error: "User not logged in" });
      }

      const parentUserId = decodedToken.userId; // Assuming this field is present in the decoded token
      console.log("Parent ID is", parentUserId);

      // Extract properties directly from req.body
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
      } = req.body;

      // Check if the required properties are provided
      if (!name || !email || !password) {
        console.error("Invalid request - Missing required member details");
        return res
          .status(400)
          .json({ error: "Invalid request - Missing required member details" });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Check if the parent member has fewer than 10 descendants
      const countDescendantsQuery = `
        SELECT COUNT(*) as descendantCount
        FROM genealogy_tree
        WHERE ancestor_id = ?;
      `;

      connection.query(
        countDescendantsQuery,
        [parentUserId],
        async (countErr, countResult) => {
          if (countErr) {
            console.error("Error counting descendants:", countErr.message);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const descendantCount = countResult[0].descendantCount;

            if (descendantCount < 10) {
              const insertMemberQuery = `
                INSERT INTO member (name, address, email, password, phonenumber, account_name, acc_no, branch, ifsc_code, pancard_no, aadhaar_no, pincode, parent_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
              `;

              connection.query(
                insertMemberQuery,
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
                  parentUserId,
                ],
                (insertErr, insertResult) => {
                  if (insertErr) {
                    console.error(
                      "Error adding new member:",
                      insertErr.message
                    );
                    res.status(500).json({ error: "Internal Server Error" });
                  } else {
                    const newMemberId = insertResult.insertId;

                    const insertTreeQuery = `
                      INSERT INTO genealogy_tree (ancestor_id, descendant_id)
                      VALUES (?, ?);
                    `;

                    connection.query(
                      insertTreeQuery,
                      [parentUserId, newMemberId],
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
                            message:
                              "Member and relationship added successfully",
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
    } catch (error) {
      console.error("Error adding member under genealogy tree:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  listDescendants: async (req, res) => {
  //   try {
  //     // Get the decoded user information from the token
  //     const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);

  //     if (!decodedToken || !decodedToken.userId) {
  //       console.error("Invalid request - User not logged in");
  //       return res.status(400).json({ error: "User not logged in" });
  //     }

  //     const userId = decodedToken.userId;

  //     // Check if the user has descendants
  //     const listDescendantsQuery = `
  //       SELECT m.*
  //       FROM genealogy_tree gt
  //       JOIN member m ON gt.descendant_id = m.memb_id
  //       WHERE gt.ancestor_id = ?;
  //     `;

  //     connection.query(listDescendantsQuery, [userId], (err, result) => {
  //       if (err) {
  //         console.error("Error listing descendants:", err.message);
  //         res.status(500).json({ error: "Internal Server Error" });
  //       } else {
  //         res.status(200).json({ descendants: result });
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error listing descendants:", error.message);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },

  try {
    const userId = req.params.userId;

    // Fetch parent member
    const parentQuery = `SELECT * FROM member WHERE memb_id = ?`;
    connection.query(parentQuery, [userId], (parentErr, parentResult) => {
      if (parentErr) {
        console.error("Error fetching parent:", parentErr.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const parentMember = parentResult[0];

        // Fetch descendants
        const listDescendantsQuery = `
          SELECT m.*
          FROM genealogy_tree gt
          JOIN member m ON gt.descendant_id = m.memb_id
          WHERE gt.ancestor_id = ?;
        `;

        connection.query(listDescendantsQuery, [userId], (descendantsErr, descendants) => {
          if (descendantsErr) {
            console.error("Error listing descendants:", descendantsErr.message);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.status(200).json({
              parent: parentMember,
              descendants: descendants,
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("Error fetching parent and descendants:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
},
};
