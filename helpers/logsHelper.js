/**
 * Adjust date range for querying
 */
function dateRange(from, to) {
    let date = {};
    if (from) date['$gte'] = new Date(from);
    if (to) date['$lte'] = new Date(to);
    return date;
}

/**
 * Parse limit as integer with error handling
 */
function parseLimit(limit) {
    return limit ? parseInt(limit) : undefined;
}

module.exports = { dateRange, parseLimit };
