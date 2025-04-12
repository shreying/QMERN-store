const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Book = require('../models/book');
const authenticateToken  = require('./userAuth');

// add book --admin
router.post('/add-book', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== 'admin') {
            return res
            .status(400)
            .json({ message: "Access denied" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//update book --admin
router.put("/update-book/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Get book ID from URL
        const user = await User.findById(req.headers.id); // Validate admin role
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                url: req.body.url,
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                description: req.body.description,
                language: req.body.language,
            },
            { new: true } // Return the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//delete book --admin
router.delete("/delete-book/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Get book ID from URL
        const user = await User.findById(req.headers.id); // Validate admin role
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get all books
router.get("/get-book", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,            
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get recently added books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(5);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;