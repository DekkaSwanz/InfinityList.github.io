const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items')


const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Configuration
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('mongoDB Connected...'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000

// Use Routes 
app.use('/api/items',items)
app.listen(port, () => console.log('server started on port ' + port));