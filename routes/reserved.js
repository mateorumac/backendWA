require('dotenv').config();
const express = require('express');
const router = express.Router();
const Reserved = require("../Database/Schemas/Reserved"); 
const jwtDecode = require('jwt-decode');
const User = require("../Database/Schemas/User"); 

router.post('/reserved', async (req, res) => {
  try {
      // Decode the JWT token to get the user's email
      const tokenSecret = process.env.TOKEN_SECRET;
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;

      // Fetch user details using email
      const user = await User.findOne({ email: userEmail });

      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }

      // Get the full first name and last name initial
      const fullName = `${user.name} ${user.lname}`;
      // Create a new reservation
      const reservation = new Reserved({
          serviceType: req.body.selectedCategory,
          reservationDate: new Date(req.body.selectedTime),
          phoneNumber: req.body.clientPhone,
          comment: `Reserved by ${fullName}`,  // Adding user's full name and last name initial to the comment
          createdAt: new Date()
      });

      // Save the reservation to the database
      await reservation.save();

      res.status(200).send({ message: 'Reservation successfully saved',
      reservation: reservation });
  } catch (error) {
      res.status(500).send({ error: 'Server error. Please try again later.'});
  }
});

router.get('/getAllReservations', async (req, res) => {
    try {
        const allReservations = await Reserved.find();
        res.status(200).send(allReservations);
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again later.'});
    }
});

  module.exports = router;