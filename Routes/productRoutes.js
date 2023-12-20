const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductController = require("../Controller/Products/productList");
const upload = require("../Config/multerConfig");

router.post("/createProduct", upload.createMulterInstance("products").fields([
  { name: 'product_images', maxCount: 15 }, // Assuming product_images is an array of images
  { name: 'video', maxCount: 1 }
]), ProductController.createProduct);

router.get("/getAllProducts", ProductController.getAllProducts);

router.get("/getProductByProductId/:id", ProductController.getProductByProductId);

router.put("/updateProductWithVideoById/:id", upload.createMulterInstance("products").fields([
  { name: 'product_images', maxCount: 15 }, // Assuming product_images is an array of images
  { name: 'video', maxCount: 1 }
]), ProductController.updateProductWithVideoById);

router.delete("/deleteProductById/:id", ProductController.deleteProductById);

module.exports = router;
