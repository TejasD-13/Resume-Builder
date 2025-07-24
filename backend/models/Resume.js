const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        template:{
        theme: String, 
        colorPalette: [String],
        },
        profileInfo: {
            profileImg: { type: String, default: null },
            profilePreviewUrl: { type: String, default: "" },
            fullName: { type: String, default: "" },
            designation: { type: String, default: "" },
            summary: { type: String, default: "" },
            location: { type: String, default: "" },
            linkedin: { type: String, default: "" },
            github: { type: String, default: "" },
            website: { type: String, default: "" }
        },
        contactInfo: {
            email: { type: String, default: "" },
            phone: { type: String, default: "" },
            location: { type: String, default: "" },
            linkedin: { type: String, default: "" },
            github: { type: String, default: "" },
            website: { type: String, default: "" }
        },
        workExperience: [
            {
                company: String,
                role: String,
                startDate: String,
                endDate: String,
                description: String,
            }
        ],
        education: [
            {
                degree: String,
                institution: String,
                startDate: String,
                endDate: String,
            }
        ],
        skills: [
            {
                name: String,
                progress: Number,
            }
        ],
        projects: [
            {
                title: String,
                description: String,
                github: String,
                liveDemo: String
            }
        ],
        certification: [
            {
                title: String,
                issuer: String,
                year: String,
            }
        ],
        languages: [
            {
                name: String,
                progress: Number,
            }
        ],
        interests: [String],
        thumbnailLink: String,
     },{
        timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
     }
);

module.exports = mongoose.model("Resume",ResumeSchema)