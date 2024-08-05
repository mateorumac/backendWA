const { Router, response, request } = require("express");
const { create } = require("../Database/Schemas/User");
const User = require("../Database/Schemas/User");
const { passwordHash, authenticateToken, verify } = require('../utils/passhash');
const { Cookie } = require("express-session");
require('dotenv').config()
const jwt = require('jsonwebtoken');
const router = Router();



router.post("/register", async (req, res) => {
    const { name, lname, email, password } = req.body
    const userDb = await User.findOne({ email })
    if (userDb) {
      res.status(400).send({ msg: "User already exist" })
    } else {
      const hashedPassword = passwordHash(password)
      const newUser = await User.create({ name, lname, email, password: hashedPassword })
      res.status(200).send({ msg: 'OK' })
      console.log('Korisnik kreiran')
    }
  
  })

  router.post("/login", async (req, res) => {
    const userDb = req.body;
    try {
      let result = await authenticateToken(userDb.email, userDb.password);
      
      
      res.cookie('token', result.token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        httpOnly: false, 
        secure: true, 
        sameSite: 'none'
      });
      
      res.send(result);
      
    } catch (e) {
      res.status(403).json({ error: e.message });
    }
  });
  
  
  router.post('/logout', (req, res) => {
      console.log('Clearing cookie...');
    const cookieOptions = {
      httpOnly: false, 
      secure: true, 
      sameSite: 'none'
    };
    res.clearCookie('token', cookieOptions);
      console.log('Cookie cleared.');
    res.status(200).json({ message: 'Logout successful' });
  });
  
  
  module.exports = router;
