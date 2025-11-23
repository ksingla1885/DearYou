const express = require('express');
const router = express.Router();
const SharedLink = require('../models/SharedLink');

// Create a new shared link
router.post('/create', async (req, res) => {
    try {
        const { code, recipientName } = req.body;

        // Check if code already exists
        const existingLink = await SharedLink.findOne({ code });
        if (existingLink) {
            return res.status(400).json({ message: 'Code already exists. Please choose another one.' });
        }

        const newLink = new SharedLink({
            code,
            recipientName
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
