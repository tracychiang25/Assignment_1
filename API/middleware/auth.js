const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

exports.authenticateJWT = async (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];

        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            // Fetch user details
            const user = await User.findOne({ username: decoded.username});

            if(!user){
                return res.sendStatus(403);
            }
            req.user = user; // Attach user document to the request object
            next();
        }
        catch(err){
            return res.sendStatus(403);
        }
    }else{
        res.sendStatus(401);
    }
};