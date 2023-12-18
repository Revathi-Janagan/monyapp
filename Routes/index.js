const express = require("express");
const router = express.Router();

const memberRoutes = require("./memberRoutes");
const sellerRoutes = require("./sellerRoutes");
const productRoutes = require("./productRoutes");

const userRoutes = require("./")


router.use("/member",memberRoutes);
router.use("/sellers",sellerRoutes);
router.use("/products",productRoutes);

module.exports= router;