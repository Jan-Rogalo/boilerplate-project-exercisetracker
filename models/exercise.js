const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    userId: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: false}
});

module.exports = mongoose.model('Exercise', exerciseSchema);
