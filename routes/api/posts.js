const express = require('express');
const router = express.Router();
const auth = require('./../../middleware/auth');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const Post = require('./../../models/Post');
const ApiController = require('./../../src/controllers/apiController');

const apiController = new ApiController;
// @Route GET api/posts
router.get('/', auth, async (req, res) => {
    try{
        const posts = await Post.find({ user: req.user.id });
        res.json(posts)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/posts
// @desc Create Post
// @access Privat
router.post('/', auth, [
    check('caption', 'Caption is Required').not().isEmpty(),
    check('uploadFile', 'File is Required').not().isEmpty(),
], async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
        const { caption, location, uploadFile} = req.body;
        // upload file to server
        
        // then ->
        const post = new Post({
            user: req.user.id,
            caption,
            location,
            image: uploadFile,
            // date_posting
        });
        await post.save();

        let base64Image = uploadFile.split(';base64,').pop();    
    
        fs.writeFile(`photos/${post.id}.jpeg`, base64Image, {encoding: 'base64'}, function(err){
            if(err)throw err;
        });
        res.status(200).json(post)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/schedule', auth,  [
    check('id', 'ID is Required').not().isEmpty(),
    check('start', 'Scheduled date is Required').not().isEmpty(),
], async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
        const {id, start} = req.body;
        const data = await Post.findByIdAndUpdate(id, { $set: { date_posting: start }}, {new: true, useFindAndModify: false});

        return res.send('Succesfully saved.')

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/location', auth, async (req, res) => {
    try{
        const { q } = req.query;
        const data = await apiController.getLocation(encodeURI(q));
        
        if(data.length === 0) {
            res.status(200).send([])
        } else {
            res.status(200).send(data);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/hashtags', auth, async (req, res) => {
        const { q } = req.query;
        try {
            const data = await apiController.getHashtags(encodeURI(q));
            return res.status(200).send(data.data.hashtags);
        } catch(error) {
            console.log(error);
            res.status(500).send('Failed request for Get Hashtags')
        }        
        
});

module.exports = router;
