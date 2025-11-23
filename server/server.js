require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL // Add your production frontend URL as CLIENT_URL in .env
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow localhost, configured CLIENT_URL, and ANY vercel.app domain (for easier deployment)
        if (
            allowedOrigins.indexOf(origin) !== -1 ||
            process.env.NODE_ENV === 'development' ||
            origin.endsWith('.vercel.app') // Allow all Vercel deployments
        ) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
// Ensure uploads directory exists (only in development or if writable)
try {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }
} catch (err) {
    console.log('Could not create uploads directory (likely read-only environment), skipping...');
}

// MongoDB Connection (Optimized for Serverless)
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = conn.connections[0].readyState;
        console.log('MongoDB Connected Successfully ✅');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
    }
};

// Connect immediately
connectDB();

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
app.use('/api/open-when', require('./routes/openWhen'));
app.use('/api/shared-links', require('./routes/sharedLink'));

// Export the Express API
module.exports = app;

// Only listen if not running on Vercel (Vercel handles the port binding)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
