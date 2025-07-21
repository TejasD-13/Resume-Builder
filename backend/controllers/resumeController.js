const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

// @desc Create a new resume
// @route POST /api/resume
// @access Private
const createResume = async (req, res) => {
    try {
        const { title, ...rest } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // Default structure for all fields
        const defaultResumeData = {
            template: {},
            profileInfo: {},
            workExperience: [],
            education: [],
            skills: [],
            projects: [],
            certification: [],
            language: [],
            interests: [],
            thumbnailLink: "",
        };

        // Merge defaults with provided data
        const resumeData = {
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...rest,
        };

        const newResume = await Resume.create(resumeData);

        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
};

// @desc Get all resumes for logged-in user
// @route GET /api/resume
// @access Private
const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch resumes", error: error.message });
    }
};

// @desc Get single resume by ID
// @route GET /api/resume/:id
// @access Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch resume", error: error.message });
    }
};

// @desc Update a resume
// @route PUT /api/resume/:id
// @access Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found or unauthorized." });
        }

        // Merge existing data with new data, preserving structure
        const defaultResumeData = {
            template: {},
            profileInfo: {},
            workExperience: [],
            education: [],
            skills: [],
            projects: [],
            certification: [],
            language: [],
            interests: [],
            thumbnailLink: "",
        };

        Object.assign(
            resume,
            { ...defaultResumeData, ...resume.toObject(), ...req.body }
        );

        const savedResume = await resume.save();

        res.json(savedResume);
    } catch (error) {
        res.status(500).json({ message: "Failed to update resume", error: error.message });
    }
};

// @desc Delete resume
// @route DELETE /api/resume/:id
// @access Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found or unauthorized" });
        }

        const uploadsFolder = path.join(__dirname, '..', 'uploads');

        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }

        if (resume.profileInfo?.previewUrl) {
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.previewUrl));
            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        await Resume.findByIdAndDelete(resume._id);

        res.json({ message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete resume", error: error.message });
    }
};

module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
};
