require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const exerciseRoutes = require('./routes/exercises');
const logRoutes = require('./routes/logs');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/api/users', userRoutes);
app.use('/api/users', exerciseRoutes);
app.use('/api/users', logRoutes);

connectDB();

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
