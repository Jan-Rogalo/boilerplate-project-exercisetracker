const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

const validateUsername = body('username').trim().isLength({ min: 1 }).escape();

/**
 * Create a new user.
 * This endpoint allows you to create a new user.
 * @route POST /api/users
 */
router.post('/', validateUsername, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username } = req.body;
        const newUser = new User({ username });

        await newUser.save();
        return res.json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Username already exists.' });
        }
        if (error.errors?.username?.kind === 'required') {
            return res.status(400).json({ error: 'Username is required.' });
        }
        return res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
});

/**
 * Get all users.
 * This endpoint allows you to retrieve all users.
 * @route GET /api/users
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
});

module.exports = router;



