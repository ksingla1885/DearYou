const express = require('express');
const router = express.Router();

// Hardcoded surprise dates and content
// Format: YYYY-MM-DD
const surprises = [
    {
        date: '2025-11-22', // Tomorrow
        title: 'The First Surprise ❤️',
        content: 'I have been waiting for this moment to tell you...',
        image: '', // You can add a Cloudinary URL here later
        unlocked: false
    },
    {
        date: '2025-12-25', // Christmas
        title: 'A Christmas Gift',
        content: 'Something special for the holidays.',
        image: '',
        unlocked: false
    }
];

router.get('/', (req, res) => {
    const today = new Date();
    const unlockedSurprises = surprises.map(s => {
        const unlockDate = new Date(s.date);
        if (today >= unlockDate) {
            return { ...s, unlocked: true };
        }
        return { ...s, content: 'Locked until ' + s.date, image: null, unlocked: false };
    });
    res.json(unlockedSurprises);
});

module.exports = router;
