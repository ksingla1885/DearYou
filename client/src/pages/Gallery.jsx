import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/gallery');
            setImages(res.data);
        } catch (err) {
            console.error('Error fetching images:', err);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        setUploading(true);
        setUploadProgress(0);
        try {
            await axios.post('http://localhost:5000/api/gallery/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            setSelectedFile(null);
            setUploadProgress(0);
            fetchImages();
            e.target.reset();
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDelete = async (imageId) => {
        if (!window.confirm('Are you sure you want to delete this image?')) {
            return;
        }

        try {
            // First, optimistically remove from UI
            setImages(prevImages => prevImages.filter(img => img._id !== imageId));

            // Then delete from server
            await axios.delete(`http://localhost:5000/api/gallery/${imageId}`);

        } catch (err) {
            console.error('Error deleting image:', err);
            alert('Failed to delete image. Refreshing gallery...');
            // Refresh the gallery if deletion failed
            fetchImages();
        }
    };

    const handleDeleteAll = async () => {
        if (!window.confirm('⚠️ Are you sure you want to delete ALL images? This cannot be undone!')) {
            return;
        }

        try {
            // Clear UI immediately
            setImages([]);

            // Delete from server
            const response = await axios.delete('http://localhost:5000/api/gallery/all/images');
            console.log(response.data.message);

        } catch (err) {
            console.error('Error deleting all images:', err);
            alert('Failed to delete all images. Refreshing gallery...');
            fetchImages();
        }
    };

    return (
        <div className="min-h-screen bg-romantic-100 pt-20 pb-10 px-4">
            <Navbar />

            <div className="max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-serif text-romantic-900 text-center mb-8"
                >
                    Our Memories
                </motion.h1>

                {/* Upload Section */}
                <div className="mb-12 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <form onSubmit={handleUpload} className="inline-flex flex-col items-center space-y-2 bg-white p-4 rounded-lg shadow-md">
                            <div className="flex items-center space-x-4">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    disabled={uploading}
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-romantic-100 file:text-romantic-500 hover:file:bg-romantic-200 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!selectedFile || uploading}
                                    className="bg-romantic-500 text-white px-6 py-2 rounded-full font-medium hover:bg-romantic-900 transition-colors disabled:opacity-50"
                                >
                                    {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Photo'}
                                </button>
                            </div>

                            {/* Progress Bar */}
                            {uploading && (
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-romantic-500 h-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            )}
                        </form>

                        {images.length > 0 && (
                            <button
                                onClick={handleDeleteAll}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2"
                            >
                                <span>🗑️</span>
                                Delete All Images
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <motion.div
                            key={img._id || index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="aspect-square overflow-hidden rounded-xl shadow-lg bg-white relative group"
                        >
                            <img
                                src={img.url}
                                alt="Memory"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    console.error('Image failed to load:', img.url);
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EImage%3C/text%3E%3C/svg%3E';
                                }}
                            />
                            {/* Delete Button Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(img._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                                >
                                    <span>🗑️</span>
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
