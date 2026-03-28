const express = require('express');
const router = express.Router();
const OpenWhen = require('../models/OpenWhen');

// GET all letters
router.get('/', async (req, res) => {
    try {
        // 2. Fetch all remaining letters
        let letters = await OpenWhen.find().sort({ createdAt: 1 });

        // 3. Remove Duplicates
        const seenTitles = new Set();
        const duplicates = [];
        const uniqueLetters = [];

        for (const letter of letters) {
            if (seenTitles.has(letter.title)) {
                duplicates.push(letter._id);
            } else {
                seenTitles.add(letter.title);
                uniqueLetters.push(letter);
            }
        }

        if (duplicates.length > 0) {
            console.log(`Removing ${duplicates.length} duplicate letters...`);
            await OpenWhen.deleteMany({ _id: { $in: duplicates } });
            letters = uniqueLetters;
        }

        // 4. Define the list of cards we WANT to ensure exist
        const desiredCards = [
            {
                title: "Open when you're angry at me",
                content: "I'm so sorry. I never want to upset you. Please take some time to cool down, and when you're ready, let's talk. I value us more than being right. I love you, and I'm listening. 💔",
                color: "bg-red-200",
                icon: "😠"
            },
            {
                title: "Open when you can't sleep",
                content: "Insomnia sucks, doesn't it? Just imagine me lying next to you, stroking your hair and humming a lullaby. Close your eyes and drift off to the rhythm of our hearts beating together. Sweet dreams, my love. 🌙",
                color: "bg-indigo-200",
                icon: "😴"
            },
            {
                title: "Open when you need motivation",
                content: "You are capable of amazing things! Don't let doubt creep in. Look at how far you've come. I believe in you 100%. Go out there and crush it! 💪",
                color: "bg-orange-100",
                icon: "🚀"
            }
        ];

        let addedNew = false;
        for (const card of desiredCards) {
            if (!seenTitles.has(card.title)) {
                await new OpenWhen(card).save();
                letters.push(card);
                addedNew = true;
            }
        }

        // Re-sort if we added anything
        if (addedNew) {
            letters = await OpenWhen.find().sort({ createdAt: 1 });
        }

        res.json(letters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new letter
router.post('/', async (req, res) => {
    const letter = new OpenWhen({
        title: req.body.title,
        content: req.body.content,
        color: req.body.color,
        icon: req.body.icon
    });

    try {
        const newLetter = await letter.save();
        res.status(201).json(newLetter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
