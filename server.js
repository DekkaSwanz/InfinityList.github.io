const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const items = require('./routes/api/items')
const cors = require('cors');

const app = express();

//cross domain workaround

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
// serve static assets in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
// Use Routes 
app.use('/api/items',items)
app.listen(port, () => console.log('server started on port ' + port));