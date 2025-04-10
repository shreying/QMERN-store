const router = require('express').Router();
const User = require('../models/user');
const authenticateToken = require('./userAuth');
const mongoose = require('mongoose');


//put book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);

        if (isBookInCart) {
            return res
            .status(200)
            .json({ 
                status: "Success",
                message: "Book is already in cart" 
            });
        }

        await User.findByIdAndUpdate(id, { 
            $push: { cart: bookid } 
        });

        return res
        .json({ 
            status: "Success",
            message: "Book added to cart" 
        });
    } catch (error) {
        console.error("Error adding book to cart:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const { bookid } = req.params;
  
      const userData = await User.findById(id);
  
      // Convert both to strings to be safe
      const isBookInCart = userData.cart.some(
        (book) => book.equals(new mongoose.Types.ObjectId(bookid))
      );
      
      
  
      if (!isBookInCart) {
        return res.status(200).json({
          status: "Success",
          message: "Book is not in cart",
        });
      }
  
      await User.findByIdAndUpdate(id, {
        $pull: { cart: bookid },
      });
  
      return res.json({
        status: "Success",
        message: "Book removed from cart",
      });
    } catch (error) {
      console.error("Error removing book from cart:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

//get cart of a user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse(); // Reverse the order of books in the cart
        
        return res.json({
            status: "Success",
            data: cart,
        });
    } catch (error) {
        console.error("Error fetching cart books:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;