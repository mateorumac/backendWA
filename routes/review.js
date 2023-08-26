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

router.post('/postrev', async (req, res) => {
    try {
        const { review, rating, userEmail, firstName, lastNameInitial } = req.body;

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).send({ msg: "User not found." });
        }

        // Check if the user's name from the database matches the first name sent and if the first character of their last name matches the last name initial sent
        if (user.name !== firstName || user.lname.charAt(0) !== lastNameInitial) {
            return res.status(400).send({ msg: "Name mismatch." });
        }

        const reviewerName = `${firstName} ${lastNameInitial}.`;

        const newReview = new Review({
            description: review,
            rating: rating,
            userEmail: userEmail,
            reviewerName  
        });

        await newReview.save();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Server error" });
    }
});

module.exports = router;
