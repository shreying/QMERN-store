const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authenticateToken = require('./userAuth');


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
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address,
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Signin
router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Check if the password is correct
        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = {
                    name: existingUser.username,
                    role: existingUser.role,
                };
                // Generate JWT token
                const token = jwt.sign({authClaims}, process.env.JWT_SECRET, { expiresIn: '1h' });
                res
                .status(200)
                .json({ 
                    id: existingUser._id, 
                    role:existingUser.role, 
                    token: token, 
                    message: "Login successful" 
                });
            }
            else {
                return res.status(400).json({ message: "Invalid username or password" });
            }
        });


    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password ");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { address }, { new: true });
        return res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
