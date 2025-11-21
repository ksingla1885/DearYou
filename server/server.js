require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
    .then(() => console.log('MongoDB Connected Successfully ✅'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        console.log('Server will continue running without database...');
    });

// Routes
app.get('/', (req, res) => {
    res.send('DearYou API is Running ❤️');
});

// Import Routes
const galleryRoutes = require('./routes/gallery');
const messageRoutes = require('./routes/messages');
const surpriseRoutes = require('./routes/surprise');

app.use('/api/gallery', galleryRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/surprise', surpriseRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
