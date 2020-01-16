const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

const User = require('./../../models/User');

// @Route POST api/users
// @desc Register User
// @access Public
router.post('/', [
    check('email', 'Email is Required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password length should be more than 5 characters').isLength({
        min: 5
    })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(500).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({
            email
        });
        if(user) {
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
            error: 'something went wrong',
            code: err
        });
    }
    

    // look if user exist 

    // Encrypt password

    // return json web token

    
});

module.exports = router;
