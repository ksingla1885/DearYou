const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary Config - YOU MUST SET THESE IN .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'romantic-gift',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
        transformation: [
            { width: 1200, height: 1200, crop: 'limit' }, // Limit max size
            { quality: 'auto:good' }, // Auto quality optimization
            { fetch_format: 'auto' } // Auto format selection
        ]
    },
});

const upload = multer({ storage: storage });

// GET all images - Note: This needs to be updated to fetch from Cloudinary or database
// For now, we will just return the list of files if we were using a DB, but since we aren't using a DB for images yet (just folder listing previously),
// we should ideally store image URLs in MongoDB when uploading to Cloudinary.
// Let's update the POST route to save to MongoDB first.


const Image = require('../models/Image');

// GET all images
router.get('/', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST upload image
router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload a file!' });
    }

    try {
        const newImage = new Image({
            url: req.file.path,
            publicId: req.file.filename
        });
        await newImage.save();

        res.status(201).send({
            message: 'File uploaded successfully',
            image: newImage
        });
    } catch (err) {
        res.status(500).send({ message: 'Error saving image info' });
    }
});

// DELETE all images - MUST come before /:id route
router.delete('/all/images', async (req, res) => {
    try {
        const images = await Image.find();

        // Delete all images from Cloudinary
        for (const image of images) {
            if (image.publicId) {
                try {
                    await cloudinary.uploader.destroy(image.publicId);
                } catch (err) {
                    console.error(`Failed to delete ${image.publicId} from Cloudinary:`, err);
                }
            }
        }

        // Delete all from MongoDB
        await Image.deleteMany({});

        res.json({ message: 'All images deleted successfully', count: images.length });
    } catch (err) {
        console.error('Error deleting all images:', err);
        res.status(500).json({ message: 'Error deleting images', error: err.message });
    }
});

// DELETE single image by ID
router.delete('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Delete from Cloudinary
        if (image.publicId) {
            await cloudinary.uploader.destroy(image.publicId);
        }

        // Delete from MongoDB
        await Image.findByIdAndDelete(req.params.id);

        res.json({ message: 'Image deleted successfully' });
    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ message: 'Error deleting image', error: err.message });
    }
});

module.exports = router;
