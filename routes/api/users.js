const express = require('express')
const router = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const User = require('../../models/Users')
const config = require('config')


const {
    check,
    validationResult
} = require('express-validator')

router.post('/', [
    check('name', 'Name is Required')
    .not()
    .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({
        min: 8
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        name,
        email,
        password
    } = req.body;

    try {
        //see if user exists
        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            })
        }

        //get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        //encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //return jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,
            config.get('secret'), {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) {
                    throw err
                }
                res.json({
                    token
                })
            }
        )

        // res.send('User registered')
    } catch (err) {
        console.error(err.message)
        return res.status(500).json("Server Error")
    }

})


module.exports = router