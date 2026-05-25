const express = require("express");
const xlsx = require('xlsx');


const router = express.Router();

const {
  createCertificate,
  verifyCertificate,
  getAllCertificates,
  deleteCertificate,
  getUserCertificates,
  bulkUploadCertificates,
} = require("../Controllers/certificateController");
const authMiddleware = require("../middleware.js/Authmiddleware");

router.post("/create",authMiddleware, createCertificate);
router.get("/verify/:id", verifyCertificate);
router.get("/all",authMiddleware, getAllCertificates);
router.delete("/delete-certificate/:id",authMiddleware, deleteCertificate);
router.get("/user-certificates/:email",authMiddleware, getUserCertificates);
router.post('/bulk-upload', authMiddleware, bulkUploadCertificates);



module.exports = router;