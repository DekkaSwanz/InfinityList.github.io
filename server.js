const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const items = require('./routes/api/items');
const cors = require('cors');
const app = express();

//cross domain workaround
app.use(cors())
// Bodyparser middleware
app.use(bodyParser.json());

// DB Configuration
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db,{useNewUrlParser:true})
    .then(() => console.log('mongoDB Connected...'))
    .catch(err => console.log(err));

const port = process.env.PORT||5000

// Use Routes 
app.use('/api/items',items)

// serve static assets in production
if(process.env.NODE_ENV === 'production'){
    console.log('in production')
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port, () => console.log('server started on port ' + port));