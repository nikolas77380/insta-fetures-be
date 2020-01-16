const express = require('express');
const router = express.Router();
const auth = require('./../../middleware/auth');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('./../../models/User');
// @Route GET api/auth
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public

router.post('/', [
    check('email', 'Email is Required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is Required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    
    const {email, password} = req.body;

    try{
        let user = await User.findOne({
            email
        });
        if(!user) {
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 }, 
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

        // res.send('User registered');
    } catch(err) {
        console.error(err.message)
        res.status(500).json({
            msg: 'something went wrong',
            code: err
        });
    }
    

    // look if user exist 

    // Encrypt password

    // return json web token

    
});

// router.post('/')

module.exports = router;
