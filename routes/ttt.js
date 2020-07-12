const User = require('../models/userModel');
const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth')

// Register Route
router.post('/create', async (req, res) => {
    try {
        let { email, displayName, password, confirmPassword } = req.body;

        // validate
        if (!email || !password || !confirmPassword)
            return res.status(400).json({ msg: 'Please fill all the fields!' })
        if (password.length < 6)
            return res.status(400).json({ msg: 'Pasword must be at least 6 character long!' })
        if (password !== confirmPassword)
            return res.status(400).json({ msg: 'Your password and confirmation password are not match!' });
        const exist_user = await User.findOne({ email: email })
        if (exist_user)
            return res.status(400).json({ msg: 'A user with this email already exist!' });
        if (!displayName) displayName = email;
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        const new_user = new User({
            email,
            password: hashedPassword,
            displayName
        });
        const saved_user = await new_user.save();
        res.json(saved_user);
    } catch (err) {
        console.log(err)
    }
});
// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: 'Please fill all the fields!' })
        const user = await User.findOne({ email: email })
        if (!user)
            return res.status(400).json({ msg: 'user with this email does not exist!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid email or password!' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECURE_KEY);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});
// Delete User
router.delete('/delete', auth, async (req, res) => {
    try {
        const deleted_user = await User.findByIdAndDelete(req.user);
        res.json(deleted_user);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});
// Verefied token
router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECURE_KEY);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id)
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get User route
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        email: user.email,
        id: user._id
    });
})

module.exports = router;