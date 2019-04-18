const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    what:{
        type: String,
        required: true
    },
    where:{
        type: String,
        required: true
    },
    when:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    },
    completed:{
        type: Boolean,
        default: false
    }
});

module.exports = Item = mongoose.model('item',ItemSchema);
