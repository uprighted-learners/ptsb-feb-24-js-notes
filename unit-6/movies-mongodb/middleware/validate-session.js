const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const validateSession = async (req, res, next) => {
    // Middleware still has access to the request, response, and requires the next() function to move past it.
    //*  remember timeLog() helper within the ToDo_List 

    try {
        //1. Take token provided by request object (headers.authorization)
        const token = req.headers.authorization;
        // console.log(token);
    
        //2. Check the status of token. (expired?)
        const decoded = await jwt.verify(token, process.env.JWT)
        //* verify(string, secret);
        console.log(decoded);
    
        //3 Provide response - if valid, generate a variable that holds our user info.
        const user = await User.findById(decoded.id)
        if(!user) throw new Error('User not found!')

        req.user = user;
    
        return next(); // moves us onto our routes
        
    } catch (err) {
        res.json({message: err.message})
    }
}

module.exports = validateSession;