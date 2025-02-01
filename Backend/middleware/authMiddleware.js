const jwt = require('jsonwebtoken');
const User =require('../models/UserModel')
const protect = async (req, res, next) => { 
    let token=req.cookies.token; 
    if ( token) {
        try { 
            const decoded = jwt.verify(token, "SECRET"); 
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) { 
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) { 
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };