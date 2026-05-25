

const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUserCount, getAllUsers } = require("../Controllers/userController");
const authMiddleware = require("../middleware.js/Authmiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all-users-count",getUserCount)
router.get("/all-users",authMiddleware,getAllUsers)

module.exports = router;