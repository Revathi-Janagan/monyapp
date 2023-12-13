// referralController.js

const connection = require('../db'); // Import your database connection

const referralController = {
  // Handle product referrals and update earnings
  refProduct: (req, res) => {
    console.log("Inside Referral Controller!");

    const { memb_id, orders } = req.body; // Include orders array in the request body

    // Assuming you have a function to get the commission rate for each product from the orders table
    const commissionRateQuery = `
      SELECT product_id, commission_rate
      FROM orders
      WHERE order_id = ?;
    `;

    // Track the total commission amount
    let totalCommission = 0;

    // Loop through each order in the orders array
    for (const order of orders) {
      const { order_id, product_id, quantity } = order;

      connection.query(commissionRateQuery, [order_id], (rateErr, rateResult) => {
        if (rateErr) {
          console.error("Error getting commission rate:", rateErr.message);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          if (rateResult.length === 0) {
            // Order not found or does not have a commission rate
            res.status(404).json({ error: "Order not found or no commission rate set." });
          } else {
            const commissionRate = rateResult[0].commission_rate;

            // Calculate the commission amount based on the commission rate and order quantity
            const commissionAmount = calculateCommission(product_id, commissionRate, quantity);

            // Update the total commission amount
            totalCommission += commissionAmount;
          }
        }
      });
    }

    // Update member's earnings in the earnings table
    const updateEarningsQuery = `
      UPDATE earnings
      SET amount = amount + ? 
      WHERE memb_id = ? AND date = CURDATE()
    `;

    connection.query(updateEarningsQuery, [totalCommission, memb_id], (updateErr, updateResult) => {
      if (updateErr) {
        console.error("Error updating earnings:", updateErr.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Earnings updated successfully");
        res.status(200).json({ message: "Earnings updated successfully", updateResult });
      }
    });
  }
};

// ... (remaining code)

module.exports = referralController;
