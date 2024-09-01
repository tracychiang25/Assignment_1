var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middleware/auth')
const User = require('../models/User');

// Login user
router.post("/login", userController.login);


router.get('/profile', middleware.authenticateJWT, (req, res)=>{
  res.json({message: 'Hello ${req.user.username}, this is your profile'});
})

// Get all users
router.get("/", userController.getUsers);



module.exports = router;
