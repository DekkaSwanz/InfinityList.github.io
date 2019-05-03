const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all Items
// @access Public
router.get('/',(req,res) =>{
    Item.find()
        .then(items => res.json(items));
})

// @route POST api/items
// @desc Create an item
// @access Public
router.post('/',(req,res) =>{
    const newItem = new Item({
        what: req.body.what,
        where: req.body.where,
        when: req.body.when
    });
    newItem.save().then(
        item => res.json(item)
    );
});

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id',(req,res) =>{
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

// @route PUT api/items/:id
// @desc Edit an item
// @access Public
router.put('/:id',(req,res) =>{
    console.log("req.params ",req.params.id)
    Item.updateOne(
        {"_id": req.params.id},
        {$set: {"completed" : true}}
    ).then(res => res.json({success:true}))
    .catch(err => console.log(err))
        
    
})

//@route PUT api/items/:cmt/:id
//@desc comment on an item
//@access Public
router.put('/comment/:cmt/:id',(req,res) =>{
    console.log("req.params ",req.params.id)
    console.log('req.params cmt ',req.params.cmt)
    Item.updateOne(
        {"_id": req.params.id},
        {$set: {"comment" : req.params.cmt}}
    ).then(res => res.json({success:true}))
    .catch(err => console.log(err))
        
    
})

module.exports = router;