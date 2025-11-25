const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages for a specific code
router.get('/', async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.json([]);
        }
        const query = { sharedLinkCode: code };
        const messages = await Message.find(query).sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new message
router.post('/', async (req, res) => {
    const message = new Message({
        content: req.body.content,
        author: req.body.author,
        sharedLinkCode: req.body.sharedLinkCode
    });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a message
router.delete('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
