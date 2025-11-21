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
    // Get current time in IST (Indian Standard Time)
    const now = new Date();
    const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    // Format to YYYY-MM-DD manually to avoid UTC shifts
    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const day = String(istDate.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    const unlockedSurprises = surprises.map(s => {
        // Compare date strings directly (e.g., "2025-11-22" >= "2025-11-22")
        if (todayStr >= s.date) {
            return { ...s, unlocked: true };
        }
        return { ...s, content: 'Locked until ' + s.date, image: null, unlocked: false };
    });
    res.json(unlockedSurprises);
});

module.exports = router;
