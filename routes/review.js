const { Router } = require("express");
const Review = require("../Database/Schemas/Review");
const jwt = require('jsonwebtoken');

const router = Router();


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ msg: 'No token provided.' });
    }

    jwt.verify(token, 'ASDSAFASF', (err, decoded) => {
        if (err) {
            return res.status(500).send({ msg: 'Failed to authenticate token.' });
        }
        
        
        req.userId = decoded.id;  
        next();
    });
}

router.get("/svi",  async (req, res) => {
    try {
        const svi = await Review.find({});
        res.send(svi);
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Server error" });
    }
});

// Add verifyToken middleware before the route handler
router.post('/postrev', verifyToken, async (req, res) => {
  console.log("Review POST endpoint hit");
    try {
        const { review, rating } = req.body;

        const newReview = new Review({
            description: review,
            rating: rating  
        });

        await newReview.save();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Server error" });
    }
});

module.exports = router;