const express = require("express");
const {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume
} = require("../controllers/resumeController");

const { protect } = require("../middlewares/authMiddleware");
const { uploadResumeImages } = require('../controllers/uploadImages');

const router = express.Router();

router.post("/", protect, createResume);             // @route POST /api/resume
router.get("/", protect, getUserResumes);            // @route GET /api/resume
router.get("/:id", protect, getResumeById);          // @route GET /api/resume/:id
router.put("/:id", protect, updateResume);           // @route PUT /api/resume/:id
router.post("/:id/upload-image", protect, uploadResumeImages); // @route POST /api/resume/:id/upload-image
router.delete("/:id", protect, deleteResume);        // @route DELETE /api/resume/:id

module.exports = router;
