const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" }); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token expired or invalid. Please sign in again." }); // Forbidden
        }

        req.user = user; // user = payload from jwt.sign()
        next();
    });
};

module.exports = authenticateToken;
