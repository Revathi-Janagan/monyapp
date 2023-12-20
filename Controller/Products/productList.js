const connection = require("../../Helper/db");

module.exports = {
  // Create a new product
  createProduct: (req, res) => {
    console.log("Inside Create Product!!!");

    const {
      seller_id,
      product_name,
      product_images,
      video, // Assuming 'video' is the field for video file
      mrp_price,
      offer,
      final_price,
    } = req.body;

    const insertQuery = `INSERT INTO product 
      (seller_id, product_name, product_images, video_url, mrp_price, offer, final_price) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      insertQuery,
      [
        seller_id,
        product_name,
        JSON.stringify(product_images),
        video, // You need to specify how the video URL is obtained or generated
        mrp_price,
        offer,
        final_price,
      ],
      (err, result) => {
        if (err) {
          console.error("Error creating product:", err.message);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Product created successfully");
          res
            .status(200)
            .json({ message: "Product created successfully", result });
        }
      }
    );
  },

  // Get all products
  getAllProducts: (req, res) => {
    console.log("Inside Get All Products!!!");

    const selectQuery = "SELECT * FROM product";

    connection.query(selectQuery, (err, result) => {
      if (err) {
        console.error("Error getting all products:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Fetched all products successfully");
        res.status(200).json(result);
      }
    });
  },

  // Get a product by ID
  getProductByProductId: (req, res) => {
    console.log("Inside Get Product By Id!!!");

    const productId = req.params.id;
    const selectQuery = "SELECT * FROM product WHERE product_id = ?";

    connection.query(selectQuery, [productId], (err, result) => {
      if (err) {
        console.error("Error getting product by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.length > 0) {
          console.log("Fetched product by id successfully");
          res.status(200).json(result[0]);
        } else {
          console.log("Product not found");
          res.status(404).json({ message: "Product not found" });
        }
      }
    });
  },

  // Update a product by ID with video file
  updateProductWithVideoById: (req, res) => {
    console.log("Inside Update Product With Video By Id!!!");

    const productId = req.params.id;
    const {
      seller_id,
      product_name,
      product_images,
      video, // Assuming 'video' is the field for video file
      mrp_price,
      offer,
      final_price,
    } = req.body;

    // Check if video is included in the update
    let updateFields = "";
    const updateValues = [
      seller_id,
      product_name,
      JSON.stringify(product_images),
      mrp_price,
      offer,
      final_price,
      productId, // The last element is the productId for the WHERE clause
    ];

    if (req.files && req.files["video"]) {
      const videoFile = req.files["video"][0];
      const videoPath = videoFile.path;

      updateFields = `video_url = ?, `;
      updateValues.unshift(videoPath);
    }

    const updateQuery = `UPDATE product SET 
      ${updateFields}
      seller_id = ?, product_name = ?, product_images = ?, 
      mrp_price = ?, offer = ?, final_price = ? 
      WHERE product_id = ?`;

    connection.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error("Error updating product by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.affectedRows > 0) {
          console.log("Product updated successfully");
          res.status(200).json({ message: "Product updated successfully" });
        } else {
          console.log("Product not found");
          res.status(404).json({ message: "Product not found" });
        }
      }
    });
  },

  // Delete a product by ID
  deleteProductById: (req, res) => {
    console.log("Inside Delete Product By Id!!!");

    const productId = req.params.id;
    const deleteQuery = "DELETE FROM product WHERE product_id = ?";

    connection.query(deleteQuery, [productId], (err, result) => {
      if (err) {
        console.error("Error deleting product by id:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.affectedRows > 0) {
          console.log("Product deleted successfully");
          res.status(200).json({ message: "Product deleted successfully" });
        } else {
          console.log("Product not found");
          res.status(404).json({ message: "Product not found" });
        }
      }
    });
  },
};
