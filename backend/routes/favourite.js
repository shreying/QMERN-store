const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth");

// Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);

    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    console.error("Error adding book to favourites:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove book from favourites
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => { 
  try {
    const { bookId } = req.body; // ✅ from body
    const id = req.headers.id;   // ✅ user id from headers

    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookId);

    if (!isBookFavourite) {
      return res.status(200).json({ message: "Book is not in favourites" });
    }

    await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } });

    return res.status(200).json({ message: "Book removed from favourites" });
  } catch (error) {
    console.error("Error removing book from favourites:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Get all favourite books of a user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.error("Error fetching favourite books:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;