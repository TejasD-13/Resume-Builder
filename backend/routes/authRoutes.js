const express = require('express');
const multer = require("multer"); // ✅ Import multer
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect }= require("../middlewares/authMiddleware");
const upload = require('../middlewares/uploadMiddleware'); 

const router = express.Router();

// Auth Routes 
router.post("/register", registerUser); // Register user
router.post("/login", loginUser);       // Login user
router.get("/profile", protect, getUserProfile); // Get user profile 

// Image Upload Route
router.post("/upload-image", (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: "Multer error", error: err.message });
        } else if (err) {
            return res.status(400).json({ message: "Upload error", error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    });
});

module.exports = router;
