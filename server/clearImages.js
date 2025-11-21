// Script to clear all images from database and Cloudinary
require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Image Model
const imageSchema = new mongoose.Schema({
    url: String,
    publicId: String,
    createdAt: { type: Date, default: Date.now }
});
const Image = mongoose.model('Image', imageSchema);

async function clearAllImages() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Get all images
        const images = await Image.find();
        console.log(`Found ${images.length} images to delete`);

        // Delete from Cloudinary
        for (const image of images) {
            if (image.publicId) {
                try {
                    await cloudinary.uploader.destroy(image.publicId);
                    console.log(`Deleted from Cloudinary: ${image.publicId}`);
                } catch (err) {
                    console.error(`Failed to delete ${image.publicId}:`, err.message);
                }
            }
        }

        // Delete all from MongoDB
        const result = await Image.deleteMany({});
        console.log(`Deleted ${result.deletedCount} records from MongoDB`);

        console.log('✅ All images cleared successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

clearAllImages();
