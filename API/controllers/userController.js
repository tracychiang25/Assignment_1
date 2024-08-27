const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

// Handle user login
exports.login = async (req, res) =>{
    const { username, password } = req.body;

    try{
        // Find the user by username
        const user = await User.findOne({ username })
        // Check if the user exists and if the pwd matches
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({ error: 'Invalid credentials'});
        }
        // If credentials match, sgenerate a JWT  token
        const secretKey = process.env.SECRET_KEY;
        const expires_in = 60*60*24; //24hrs

        const token = jwt.sign({username: user.username}, secretKey, {expiresIn: expires_in});
        res.status(200).json({
            token_type: 'Bearer',
            token,
            expires_in
        })
        
    } catch(err){
        res.status(500).json({error:err.message})
    }

};

// Get all users
exports.getUsers = async (req, res) =>{

    console.log('GET /users route hit'); // Debug log
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}



