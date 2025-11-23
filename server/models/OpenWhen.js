const mongoose = require('mongoose');

const openWhenSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'bg-romantic-200' // Default Tailwind class or hex code
    },
    icon: {
        type: String,
        default: '💌'
    }
}, { timestamps: true });

module.exports = mongoose.model('OpenWhen', openWhenSchema);
