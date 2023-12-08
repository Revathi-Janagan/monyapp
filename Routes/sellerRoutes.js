const express = require("express");
const router = express.Router();
const multer = require("multer");

const SellerReg = require("../Controller/Seller/SellerReg");
const upload = require("../Config/multerConfig");

router.post(
  "/regSeller",
  // upload.createMulterInstance("sellers").fields([
  //   { name: 'pancardFrontImage', maxCount: 1 },
  //   { name: 'pancardBackImage', maxCount: 1 },
  //   { name: 'companyLogo', maxCount: 1 }
  // ]),
  SellerReg.regSeller
);

router.get("/getAllSellers", SellerReg.getAllSellers);
router.get("/getSellerById/:id", SellerReg.getSellerById);
router.put(
  "/updateSellerById/:id",
  upload.createMulterInstance("sellers").fields([
    { name: 'pancardFrontImage', maxCount: 1 },
    { name: 'pancardBackImage', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
  ]),
  SellerReg.updateSellerById
);

router.delete("/deleteSellerById/:id", SellerReg.deleteSellerById);

module.exports = router;
