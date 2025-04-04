const router = require('express').Router();
const User = require('../models/user');


// Signup
router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check username length
        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be more than 4 characters" });
        }

        // Check if username is already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Check if email is already taken
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already taken" });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be more than 6 characters" });
        }

        // Hash the password before saving
        //const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password,
            address,
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
