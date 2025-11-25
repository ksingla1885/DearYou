const express = require('express');
const router = express.Router();
const SharedLink = require('../models/SharedLink');
const multer = require('multer');
const path = require('path');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dearyou-backgrounds',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
        transformation: [
            { width: 1920, crop: 'limit' }, // Limit width for backgrounds
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
        ]
    },
});

const upload = multer({ storage: storage });

// Create a new shared link
router.post('/create', upload.single('backgroundImage'), async (req, res) => {
    try {
        const { code, recipientName } = req.body;

        // Check if code already exists
        const existingLink = await SharedLink.findOne({ code });
        if (existingLink) {
            return res.status(400).json({ message: 'Code already exists. Please choose another one.' });
        }

        const newLink = new SharedLink({
            code,
            recipientName,
            backgroundImage: req.file ? req.file.path : null
        });

        await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get recipient name by code
router.get('/:code', async (req, res) => {
    try {
        const link = await SharedLink.findOne({ code: req.params.code });
        if (!link) {
            return res.status(404).json({ message: 'Invalid code' });
        }
        res.json(link);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
