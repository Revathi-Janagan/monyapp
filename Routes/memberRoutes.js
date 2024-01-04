const express = require("express");
const router = express.Router();
const multer = require("multer");

const MemberReg = require("../Controller/Member/MemberReg");
const GenealogyReg = require("../Controller/Geneology Tree/geneologytree")
const upload = require("../Config/multerConfig");
const { verifyToken, verifyMember } = require("../Middlewares/TokenVerification");

router.post("/regMemb", MemberReg.regMemb);
router.get("/getAllMemb", verifyToken, verifyMember, MemberReg.getAllMemb);
router.get("/getMembById/:id", MemberReg.getMembById);
router.put("/updateMemb/:id", verifyToken, verifyMember, MemberReg.updateMembById);
router.delete("/deleteMemb", MemberReg.deleteMembById);
router.post("/genealogy", verifyToken, verifyMember, GenealogyReg.addMemberUnderTree);
router.get("/listmembersfromparent/:userId", verifyToken,verifyMember,GenealogyReg.listDescendants);

module.exports = router;
