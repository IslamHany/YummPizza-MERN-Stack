const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const keys = require('../config/keys');
const auth = require('../middleware/auth');
const router = new express.Router();

//User sign up
router.post('/register', async(req, res) => {
  try{
    const {name, email, password} = req.body;
    if(!name || !email, !password){
      res.status(400);
      return res.send({error: "Please fill all fields"});
    }
    let existingUser = await User.findOne({email: email});
    if(existingUser){
      res.status(400);
      return res.send({error: "this email already exists try another one"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name, 
      email,
      password: hashedPassword
    });
    await user.save();
    const token = jwt.sign({_id: user._id}, keys.JWT_SECRET);
    res.status(200);
    res.send({id: user._id, name: user.name, email: user.email, token: token});
  }catch(error){
    res.status(500);
    res.send({error: 'server error'});
  }
});

//User login
router.post('/login', async (req, res) => {
  try{
    const {email, password} = req.body;
    if(!email || !password){
      res.status(400);
      return res.send({error: "Please fill all fields"});
    }
    const user = await User.findOne({email: email});
    if(!user){
      res.status(401);
      return res.send({error: "Invalid credentials"});
    }
    const salt = await bcrypt.genSalt(10);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      res.status(401);
      return res.send({error: "invalid credentials"});
    }
    const token = jwt.sign({_id: user._id}, keys.JWT_SECRET);
    res.status(200);
    res.send({id: user._id, name: user.name, email: user.email, token: token});
  }catch(error){
    res.status(500);
    res.send({error: "server error"});
  }
});

//User logout
router.post('/logout', (req, res) => {
  req.user = "";
  res.status(200);
  res.send();
});

//Get user profile
router.get('/me', auth, async (req, res) => {
  res.status(200);
  res.send(req.user);
});

module.exports = router;