const User = require('../models/User');

/**
 * Validates a User ID.
 * This function checks if the User ID is in a valid MongoDB ObjectId format and whether
 * a user with the given ID exists in the database.
 * @param {string} userId - The ID of the user to validate.
 * @returns {Object} - If the User ID is invalid or the user is not found, it returns
 * an error message. If the user is found, it returns the user object.
 */
const validateUserId = async (userId) => {
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return { error: 'Invalid user ID format.' };
    }

    const userFound = await User.findById(userId);
    if (!userFound) {
        return { error: 'User not found.' };
    }

    return { userFound };
};

module.exports = { validateUserId };
