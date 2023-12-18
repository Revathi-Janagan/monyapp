const express = require("express");
const router = express.Router();
const multer = require("multer");

const MemberReg = require("../Controller/Member/MemberReg");
const upload = require("../Config/multerConfig");

router.post(
  "/regMemb",
  //   upload.createMulterInstance("members").fields([
  //     { name: "pancardFrontImage", maxCount: 1 },
  //     { name: "pancardBackImage", maxCount: 1 },
  //   ]),
  MemberReg.regMemb
);
router.get("/getAllMemb", MemberReg.getAllMemb);
router.get("/getMmbById", MemberReg.getMembById);
router.put(
  "/updateMemb",
  upload.createMulterInstance("members").fields([
    { name: "pancardFrontImage", maxCount: 1 },
    { name: "pancardBackImage", maxCount: 1 },
  ]),
  MemberReg.updateMembById
);

router.delete("/deleteMemb", MemberReg.deleteMembById);

module.exports = router;
