const express = require('express');
const User = require('./user.model');
const router = express.Router();
const path = require('path')

router.use(express.static(path.join(__dirname, '../Mash/dist')))
router.post('/login', async (req, res) => {
    const {Username, Password } = req.body;
    console.log(req.body)
    try {
        // Check if user exists
        const user = await User.findOne({Username}).exec();
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if password is correct
        if (Password !== user.Password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Authentication successful
        res.json({ message: 'Login successful', user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;