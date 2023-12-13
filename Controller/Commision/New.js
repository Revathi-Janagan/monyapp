// referralController.js

const connection = require('../db'); // Import your database connection

const referralController = {
  // Handle product referrals and update earnings
  refProduct: (req, res) => {
    console.log("Inside Referral Controller!");

    const { memb_id, product_id } = req.body;

    // Assuming you have a function to get the commission rate for the product
    const commissionRateQuery = `
      SELECT commission_rate
      FROM products
      WHERE product_id = ?
    `;

    connection.query(commissionRateQuery, [product_id], (rateErr, rateResult) => {
      if (rateErr) {
        console.error("Error getting commission rate:", rateErr.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (rateResult.length === 0) {
          // Product not found or does not have a commission rate
          res.status(404).json({ error: "Product not found or no commission rate set." });
        } else {
          const commissionRate = rateResult[0].commission_rate;

          // Calculate the commission amount based on the commission rate
          const commissionAmount = calculateCommission(product_id, commissionRate);

          // Update member's earnings in the earnings table
          const updateEarningsQuery = `
            UPDATE earnings
            SET amount = amount + ? 
            WHERE memb_id = ? AND date = CURDATE()
          `;

          connection.query(updateEarningsQuery, [commissionAmount, memb_id], (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating earnings:", updateErr.message);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              console.log("Earnings updated successfully");
              res.status(200).json({ message: "Earnings updated successfully", updateResult });
            }
          });
        }
      }
    });
  }
};

module.exports = referralController;
