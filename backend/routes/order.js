const router = require("express").Router();
const authenticateToken = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for (const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id,
            });
            const orderDataFromDb = await newOrder.save();
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }

        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

});

//get order history of user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"}
        });

        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        });
    } catch (error) {
        console.error("Error fetching order history:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

//get all orders --admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
        .populate({
            path: "book",
        })
        .populate({
            path: "user",
        })
        .sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        console.error("Error fetching all orders:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

//update order status --admin
router.put("/update-order-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, {
            status: req.body.status,
        });
        return res.json({
            status: "Success",
            message: "Order status updated successfully",
        });
    } catch (error) {
        console.error("Error updating order status:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;