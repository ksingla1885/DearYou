const mongoose = require('mongoose');

const sharedLinkSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    recipientName: {
        type: String,
        required: true,
        trim: true
    },
    backgroundImage: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SharedLink', sharedLinkSchema);
