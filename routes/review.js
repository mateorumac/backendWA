const { Router } = require("express");
const Review = require("../Database/Schemas/Review");
const User = require("../Database/Schemas/User");

const router = Router();

router.get("/svi", async (req, res) => {
    try {
        const svi = await Review.find({});
        res.send(svi);
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Server error" });
    }
});

router.post('/review', async (req, res) => {
    try {
        
        // Create a new review
        const review = new Review({
            review: req.body.review,
            rating: req.body.rating,
            reviewerName: req.body.reviewerName,  // Directly using the reviewerName sent from frontend
            createdAt: new Date()
        });
  
        // Save the review to the database
        await review.save();
  
        res.status(200).send({ message: 'Review successfully saved', review: review });
    } catch (error) {
        console.error("Error while creating review:", error);  // Enhanced logging
        res.status(500).send({ error: 'Server error. Please try again later.'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const reviewId = req.params.id;
        await Review.findByIdAndDelete(reviewId);
        res.status(200).send({ message: 'Review successfully deleted' });
    } catch (error) {
        console.error("Error while deleting review:", error);
        res.status(500).send({ error: 'Server error. Please try again later.'});
    }
});

module.exports = router;
