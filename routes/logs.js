const express = require('express');
const Exercise = require('../models/exercise');
const { validateUserId } = require('../helpers/userHelper');
const { dateRange, parseLimit } = require('../helpers/logsHelper');
const router = express.Router();

/**
 * Get exercise logs for a user.
 * This endpoint allows you to retrieve the exercise logs for a specific user.
 * @route GET /api/users/:_id/logs
 */

router.get('/:_id/logs', async (req, res) => {
    try {
        const userId = req.params._id;
        const { error, userFound } = await validateUserId(userId);
        if (error) {
            return res.status(error === 'Invalid user ID format.' ? 400 : 404).json({ error });
        }

        let { from, to, limit } = req.query;
        let queryObj = { userId };

        if (from || to) {
            queryObj.date = dateRange(from, to);
        }

        const limitParam = parseLimit(limit);

        const allExercises = await Exercise.find(queryObj).sort({ date: 1 }).exec();
        const count = allExercises.length;

        const limitedExercises = limitParam > 0 ? allExercises.slice(0, limitParam) : allExercises;

        const log = limitedExercises.map(ex => ({
            description: ex.description,
            duration: ex.duration,
            date: new Date(ex.date).toDateString()
        }));

        res.json({
            _id: userFound._id,
            username: userFound.username,
            count,
            log
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'There was a problem retrieving the logs.' });
    }
});


module.exports = router;
