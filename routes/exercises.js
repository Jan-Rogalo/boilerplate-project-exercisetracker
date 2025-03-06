const express = require('express');
const { body, validationResult } = require('express-validator');

const Exercise = require('../models/exercise');
const { validateUserId } = require('../helpers/userHelper');

const router = express.Router();

/**
 * Create a new exercise.
 * This endpoint allows a user to log an exercise that they have performed.
 * @route POST /api/users/:_id/exercises
 */

router.post(
    '/:_id/exercises',
    [
        body('description').notEmpty().trim().escape().withMessage('Description is required.'),
        body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer.'),
        body('date').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Invalid date format.')
    ],
    async (req, res) => {
        try {
            // Validate request body
            const result = validationResult(req);
            if (!result.isEmpty()) {
                const errors = result.array().map(({ param, msg }) => ({ param, msg }));
                return res.status(400).json({ error: errors[0].msg });
            }

            // Validate user ID
            const userId = req.params._id;
            const { error, userFound } = await validateUserId(userId);
            if (error) {
                return res.status(error === 'Invalid user ID format.' ? 400 : 404).json({ error });
            }

            // Save exercise
            const exercise = new Exercise({
                userId,
                ...req.body,
                date: req.body.date ? new Date(req.body.date) : new Date()
            });

            // Respond with saved exercise
            const savedExercise = await exercise.save();
            res.json(savedExercise);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'There was a problem adding the exercise.' });
        }
    }
);

module.exports = router;
