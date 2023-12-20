const connection = require("../../Helper/db");

const referralController = {
  refProduct: async (req, res) => {
    console.log("Inside Referral Controller!");

    const { memb_id, orders } = req.body;

    try {
      let totalCommission = 0;
      for (const order of orders) {
        const { order_id, product_id, quantity } = order;
        const rateResult = await getCommissionRate(order_id);
        if (rateResult.length === 0) {
          res
            .status(404)
            .json({ error: "Order not found or no commission rate set." });
          return;
        }

        const commissionRate = rateResult[0].commission_rate;
        const commissionAmount = await calculateCommission(
          product_id,
          quantity
        );

        totalCommission += commissionAmount;
      }

      await updateEarningsToday(memb_id, totalCommission);

      console.log("Earnings updated successfully");
      res.status(200).json({ message: "Earnings updated successfully" });
    } catch (error) {
      console.error("Error in referralController:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

async function getCommissionRate(order_id) {
  const commissionRateQuery = `
    SELECT product_id, commission_rate
    FROM orders
    WHERE order_id = ?;
  `;

  return await connection.query(commissionRateQuery, [order_id]);
}

async function calculateCommission(product_id, quantity) {
  try {
    const getProductDetailsQuery = `
      SELECT price, commission_rate
      FROM product
      WHERE product_id = ?;
    `;

    const productResult = await connection.query(getProductDetailsQuery, [
      product_id,
    ]);

    if (productResult.length === 0) {
      throw new Error("Product not found");
    }

    const { price, commission_rate } = productResult[0];

    if (isNaN(price) || isNaN(commission_rate) || isNaN(quantity)) {
      throw new Error("Invalid input for commission calculation");
    }

    const totalAmount = price * quantity;
    const commissionAmount = (totalAmount * commission_rate) / 100;

    return parseFloat(commissionAmount.toFixed(2));
  } catch (error) {
    console.error("Error calculating commission:", error.message);
    throw new Error("Error calculating commission");
  }
}

async function updateEarningsToday(memb_id, totalCommission) {
  const updateEarningsTodayQuery = `
    INSERT INTO earnings (memb_id, date, amount)
    VALUES (?, CURDATE(), ?)
    ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount);
  `;

  await connection.query(updateEarningsTodayQuery, [memb_id, totalCommission]);
}

module.exports = referralController;
